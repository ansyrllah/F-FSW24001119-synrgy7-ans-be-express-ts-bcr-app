import { CarsModel } from "@Models/Cars/CarsModel";
import { CarsLogsRepository } from "@Repositories/Cars/CarsLogsRepository";

export class CarsLogsService {
  public carsLogsRepository: CarsLogsRepository;

  constructor(carsLogsRepository: CarsLogsRepository) {
    this.carsLogsRepository = carsLogsRepository;
  }

  public async checkCarsId(id: number): Promise<CarsModel | undefined> {
    return await this.carsLogsRepository.checkCarsId(id);
  }

  public async getAllCarsLogs(): Promise<CarsModel[]> {
    return await this.carsLogsRepository.getAllCarsLogs();
  }

  public async getCarsLogsById(idCars: number): Promise<CarsModel | undefined> {
    return await this.carsLogsRepository.getCarsLogsById(idCars);
  }
}