import User from "../model/user.model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { ACCESS_TOKEN } from "../env";
import { IJwtUser } from "../interfaces/user.interface";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (!users.length) {
      return res.status(204).json({ message: "No users found" });
    }
    res.json(users);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "User ID required" });
    }
    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
      return res.status(204).json({ message: `User ID ${id} not found` });
    }
    const result = await user.deleteOne({ _id: id });
    res.json(result);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID required" });
    }
    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
      return res.status(204).json({ message: `User ID ${id} not found` });
    }
    res.json(user);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

const getAuthenticatedUserData = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.sendStatus(401).json({ error: "Unauthorized" });
    }

    const token = authorizationHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, ACCESS_TOKEN) as IJwtUser;
      const user = decoded?.UserInfo?.user;

      const userDocument = await User.findOne({ user }).exec();
      if (!userDocument)
        return res.status(404).json({ error: "User not found" });

      return res.json(userDocument);
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

const updateAuthenticatedUserData = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer "))
      return res.sendStatus(401).json({ error: "Unauthorized" });

    const token = authorizationHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, ACCESS_TOKEN) as IJwtUser;
      const user = decoded?.UserInfo?.user;
      const userDocument = await User.findOne({ user });
      await User.findByIdAndDelete(userDocument?._id);
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteAuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authorizationHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, ACCESS_TOKEN) as IJwtUser;
      const user = decoded?.UserInfo?.user;
      const userDocument = await User.findOne({ user });
      await User.findByIdAndDelete(userDocument?._id);
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

const getIds = async (req: Request, res: Response) => {
  try {
    const ids = await User.find({}, "_id");
    const idArray = ids.map((user) => user._id);
    return res.json(idArray);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};

export {
  getAllUsers,
  deleteUser,
  getUser,
  getAuthenticatedUserData,
  updateAuthenticatedUserData,
  deleteAuthenticatedUser,
  getIds,
};
