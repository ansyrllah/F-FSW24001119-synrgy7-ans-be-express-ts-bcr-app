import "dotenv/config"
import { Request, Response, NextFunction } from "express";
import jwt, {
  GetPublicKeyOrSecret,
  Secret,
  VerifyErrors,
  JwtPayload,
} from "jsonwebtoken";

export async function authorize(req: any, res: Response, next: NextFunction) {
  const tokenHeaderJWT = req.headers.authorization

  if (tokenHeaderJWT === undefined) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (tokenHeaderJWT.split(" ")[0] !== "Bearer") {
    return res.status(401).json({
      message: "Incorrect Format Token",
    });
  }
  
  const tokenJWT = tokenHeaderJWT.split("Bearer ")[1]
  
  jwt.verify(
    tokenJWT, process.env.JWT_SECRET as Secret | GetPublicKeyOrSecret, (error, decoded) => {
      if (error as VerifyErrors) {
        return res.status(401).json({
          message: "Error",
          error: (error as VerifyErrors).message,
        });
      }
      req.user = (decoded as JwtPayload).user;
      next();
    }
  );
}

export function checkRole(role: string[]) {
  return (req: any, res: Response, next: NextFunction) => {
    if(!role.includes(req.user.role)) {
      return res.status(401).json({
        message: "You cannot access this feature!"
      })
    }
    next()
  }
}