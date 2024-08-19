import { CarsLogsModel } from "@Models/Cars/CarsLogsModel";
import { CarsModel } from "@Models/Cars/CarsModel";
import { CreateCarsLogs } from "@Interfaces/Cars/CarsInterface";
import { AnyQueryBuilder } from "objection";
import { Exception } from "@Exceptions/exception";

export class CarsLogsRepository {
  public async checkCarsId(id: number): Promise<CarsModel | undefined> {
    const getCars = await CarsModel.query()
      .where("id", id)
      .first();

    if (getCars) {
      return getCars;
    } else {
      throw new Exception("Data not found", 404, {});
    }
  }

  public async getAllCarsLogs(): Promise<CarsModel[]> {
    return await CarsModel.query()
      .withGraphFetched("[carsLogs(selectLogs)]")
      .modifiers({
        selectLogs: (builder: AnyQueryBuilder) => {
          builder
            .select("action", "time_log")
            .orderBy("id", "desc")
            .withGraphFetched("[users(selectUsers)]")
            .modifiers({
              selectUsers: (builder: AnyQueryBuilder) => {
                builder.select("name", "email", "role");
              },
            });
        },
      })
      .orderBy("id", "desc");
  }

  public async getCarsLogsById(idCars: number): Promise<CarsModel | undefined> {
    return await CarsModel.query()
      .where("id", idCars)
      .withGraphFetched("[carsLogs(selectLogs)]")
      .modifiers({
        selectLogs: (builder: AnyQueryBuilder) => {
          builder
            .select("action", "time_log")
            .orderBy("id", "desc")
            .withGraphFetched("[users(selectUsers)]")
            .modifiers({
              selectUsers: (builder: AnyQueryBuilder) => {
                builder.select("name", "email", "role");
              },
            });
        },
      })
      .first();
  }

  public async addCarsLogs(data: CreateCarsLogs): Promise<any> {
    return await CarsLogsModel.query().insert({
      cars_id: data.cars_id,
      users_id: data.users_id,
      time_log: data.time_log,
      action: data.action,
    });
  }
}