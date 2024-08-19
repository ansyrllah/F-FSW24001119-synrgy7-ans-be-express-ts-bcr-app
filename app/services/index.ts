import { CarsService } from "@Services/Cars/CarsService";
import { CarsLogsService } from "@Services/Cars/CarsLogsService";
import { UsersService } from "@Services/Users/UsersService";
import { AuthService } from "@Services/Auth/AuthService";
import {
  carsRepository,
  carsLogsRepository,
  usersRepository,
  authRepository,
} from "@Repositories/index";

const carsService = new CarsService(carsRepository, carsLogsRepository);
const carsLogsService = new CarsLogsService(carsLogsRepository);
const usersService = new UsersService(usersRepository);
const authService = new AuthService(authRepository);

export { carsService, carsLogsService, usersService, authService };