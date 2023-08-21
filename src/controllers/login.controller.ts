import User from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../env";

const handleLogin = async (req: Request, res: Response) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "User and pwd are required." });

  const foundUser = await User.findOne({ user }).exec();
  if (!foundUser) return res.sendStatus(401);
  // evaluate pwd
  const match = await bcrypt.compare(pwd, foundUser.pwd);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          user: foundUser.user,
          roles: roles,
        },
      },
      ACCESS_TOKEN,
      { expiresIn: "10s" }
    );
    const refreshToken = jwt.sign(
      { user: foundUser.user },
      REFRESH_TOKEN,
      { expiresIn: "1d" }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user
    res.json({ roles, accessToken });
  } else {
    res.sendStatus(401);
  }
};

export { handleLogin };
