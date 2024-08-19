import { CarsModel } from "@Models/Cars/CarsModel";
import { CarsRepository } from "@Repositories/Cars/CarsRepository";
import { CarsLogsRepository } from "@Repositories/Cars/CarsLogsRepository";
import { cloudinary, UploadApiResponse } from "@Config/cloudinary";
import { CreateCars, UpdateCars, CreateCarsLogs, QueryFilterCars } from "@Interfaces/Cars/CarsInterface";

export class CarsService {
  public carsRepository: CarsRepository;
  public carsLogsRepository: CarsLogsRepository;

  constructor(carsRepository: CarsRepository, carsLogsRepository: CarsLogsRepository) {
    this.carsRepository = carsRepository;
    this.carsLogsRepository = carsLogsRepository;
  }

  public async getAll(): Promise<CarsModel[]> {
    return await this.carsRepository.getAll();
  }

  public async getById(id: number): Promise<CarsModel | undefined> {
    return await this.carsRepository.getById(id);
  }

  public async getCarsAvailable(): Promise<CarsModel[]> {
    return await this.carsRepository.getCarsAvailableAll();
  }

  public async getFilterCarsAvailable(reqFilter: QueryFilterCars): Promise<CarsModel[]> {
    return await this.carsRepository.getCarsAvailableFilter(reqFilter);
  }

  public async addCars(dataCars: CreateCars, dataAuth: CreateCarsLogs, file: string): Promise<any> {
    try {
      const uploadCloudinary: UploadApiResponse =
        await cloudinary.uploader.upload(file, {
          folder: "web_bcr_cars",
          use_filename: true,
        });
      dataCars.image = uploadCloudinary?.secure_url;
      const insertAndGetId: CarsModel = await this.carsRepository.addCars(
        dataCars
      );

      dataAuth.cars_id = insertAndGetId.id;
      await this.carsLogsRepository.addCarsLogs(dataAuth);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async editCars(id: number, dataCars: UpdateCars, dataAuth: CreateCarsLogs, file: string): Promise<any> {
    try {
      const uploadCloudinary: UploadApiResponse =
        await cloudinary.uploader.upload(file, {
          folder: "web_bcr_cars",
          use_filename: true,
        });
      dataCars.image = uploadCloudinary?.secure_url;
      await this.carsRepository.editCars(id, dataCars);

      dataAuth.cars_id = id;
      await this.carsLogsRepository.addCarsLogs(dataAuth);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async delete(id: number, dataAuth: CreateCarsLogs): Promise<any> {
    try {
      await this.carsRepository.delete(id);

      dataAuth.cars_id = id;
      await this.carsLogsRepository.addCarsLogs(dataAuth);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
