import { CarsController } from "@Controllers/Cars/CarsController";
import { UsersController } from "@Controllers/Users/UsersController";
import { AuthController } from "@Controllers/Auth/AuthController";
import {
  carsService,
  carsLogsService,
  usersService,
  authService,
} from "@Services/index";

const carsController = new CarsController(carsService, carsLogsService);
const usersController = new UsersController(usersService);
const authController = new AuthController(authService);

export { carsController, usersController, authController };
