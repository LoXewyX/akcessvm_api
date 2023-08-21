import { NextFunction, Request, Response, RequestHandler } from "express";

interface AuthenticatedRequest extends Request {
  roles: number[];
}

const verifyRoles = (...allowedRoles: number[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!(req as AuthenticatedRequest).roles) return res.sendStatus(401);
    const rolesArray = allowedRoles;
    const result = (req as AuthenticatedRequest).roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val);

    if (!result) return res.sendStatus(401);
    next();
  };
};

export default verifyRoles;
