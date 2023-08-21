import User from "../model/user.model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../env";
import { IJwtUser } from "../interfaces/user.interface";

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken: string = cookies.jwt;

  
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN) as IJwtUser["UserInfo"];
      const user = decoded?.user;

    if (foundUser.user !== user) return res.sendStatus(403);

    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          user: decoded.user,
          roles: roles,
        },
      },
      ACCESS_TOKEN,
      { expiresIn: "10s" }
    );

    res.json({ roles, accessToken });
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

export { handleRefreshToken };
