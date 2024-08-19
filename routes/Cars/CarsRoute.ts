import express, { Express, Request, Response } from "express"
import { authorize, checkRole } from "@Middlewares/authorization";
import { carsController } from "@Controllers/index";
import { upload } from "@Middlewares/multer";

const carsRouter: Express = express()

carsRouter.route('/')
  .get([authorize, checkRole(["SUPERADMIN", "ADMIN"])], (req: Request, res: Response): Promise<void> => carsController.getAll(req, res))
  .post([authorize, checkRole(["SUPERADMIN", "ADMIN"]), upload("image")], (req: Request, res: Response): Promise<void> => carsController.addCars(req, res))

carsRouter.route('/list-available')
  .get((req: Request, res: Response): Promise<void> => carsController.getCarsAvailable(req, res))

carsRouter.route('/logs')
  .get([authorize, checkRole(["SUPERADMIN", "ADMIN"])], (req: Request, res: Response): Promise<void> => carsController.getCarsLogs(req, res))

carsRouter.route('/:id')
  .get([authorize, checkRole(["SUPERADMIN", "ADMIN"])], (req: Request, res: Response): Promise<void> => carsController.getById(req, res))
  .put([authorize, checkRole(["SUPERADMIN", "ADMIN"]), upload("image")], (req: Request, res: Response): Promise<void> => carsController.editCars(req, res))
  .delete([authorize, checkRole(["SUPERADMIN", "ADMIN"])], (req: Request, res: Response): Promise<void> => carsController.delete(req, res))

carsRouter.route('/:idCars/logs')
    .get([authorize, checkRole(["SUPERADMIN", "ADMIN"])], (req: Request, res: Response): Promise<void> => carsController.getCarsLogsById(req, res))

export default carsRouter
