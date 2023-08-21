import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ACCESS_TOKEN } from "../env";

interface IUserPayload {
  UserInfo: {
    user: string;
    roles: number[];
  };
}

const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (
    !authHeader ||
    typeof authHeader !== "string" ||
    !authHeader.startsWith("Bearer ")
  )
    return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using a promise-based approach
    const decoded = await new Promise<IUserPayload | undefined>(
      (resolve, reject) => {
        verify(token, ACCESS_TOKEN, (err, decoded) => {
          err ? reject(err) : resolve(decoded as IUserPayload);
        });
      }
    );

    if (!decoded) return res.sendStatus(403);

    // Assert that the Request object has the required properties
    const authenticatedReq = req as Request & { user: string; roles: number[] };
    authenticatedReq.user = decoded.UserInfo.user;
    authenticatedReq.roles = decoded.UserInfo.roles;
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

export default verifyJWT;