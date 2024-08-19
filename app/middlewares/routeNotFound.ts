import { Response, NextFunction } from "express";

export function routeNotFound() {
  return (req: any, res: Response, next: NextFunction) => {
      return res.status(404).send({
        status: false,
        message: "Route not found",
      });
  };
}
