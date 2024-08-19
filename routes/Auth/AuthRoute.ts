import express, { Express, Request, Response } from "express";
import { authorize } from "@Middlewares/authorization";
import { noneMulter } from "@Middlewares/multer";
import { authController } from "@Controllers/index";

const authRouter: Express = express();

authRouter.route("/login")
  .post([noneMulter.none()], (req: Request, res: Response): Promise<void> => authController.login(req, res));

authRouter.route("/register")
  .post(
    [noneMulter.none()], (req: Request, res: Response): Promise<void> => authController.register(req, res));

authRouter.route("/current-user")
  .get([authorize], (req: Request, res: Response): Promise<void> => authController.currentUser(req, res));

export default authRouter;
