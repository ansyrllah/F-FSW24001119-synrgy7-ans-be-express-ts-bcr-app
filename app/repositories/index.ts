import { CarsRepository } from "@Repositories/Cars/CarsRepository";
import { CarsLogsRepository } from "@Repositories/Cars/CarsLogsRepository";
import { UsersRepository } from "@Repositories/Users/UsersRepository";
import { AuthRepository } from "@Repositories/Auth/AuthRepository";

const carsRepository = new CarsRepository();
const carsLogsRepository = new CarsLogsRepository();
const usersRepository = new UsersRepository();
const authRepository = new AuthRepository();

export { 
  carsRepository, 
  carsLogsRepository, 
  usersRepository, 
  authRepository 
};
