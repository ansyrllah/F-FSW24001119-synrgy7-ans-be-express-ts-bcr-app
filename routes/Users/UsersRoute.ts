import express, { Express, Request, Response } from "express";
import { noneMulter } from "@Middlewares/multer";
import { usersController } from "@Controllers/index";

const userRouter: Express = express();

userRouter
  .route("/")
  .get((req: Request, res: Response): Promise<void> => usersController.getAll(req, res))
  .post([noneMulter.none()], (req: Request, res: Response): Promise<void> => usersController.addUsers(req, res));

userRouter.route("/:id")
  .get((req: Request, res: Response): Promise<void> => usersController.getById(req, res))
  .put([noneMulter.none()], (req: Request, res: Response): Promise<void> => usersController.editUsers(req, res))
  .delete((req: Request, res: Response): Promise<void> => usersController.delete(req, res));

export default userRouter;
