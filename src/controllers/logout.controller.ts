import User from "../model/user.model";
import { Request, Response } from "express";

const handleLogout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  const refreshToken = cookies?.jwt;

  if (!refreshToken) {
    return res.sendStatus(204);
  }

  try {
    const foundUser = await User.findOneAndUpdate(
      { refreshToken },
      { refreshToken: "" },
      { new: true }
    ).exec();

    if (!foundUser) {
      return res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true }).sendStatus(404);
    }

    return res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true }).sendStatus(200);
  } catch (err) {
    console.error("Error during logout:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export { handleLogout };
