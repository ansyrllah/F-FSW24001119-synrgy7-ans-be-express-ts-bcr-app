import { CarsModel } from "@Models/Cars/CarsModel";
import { CreateCars, UpdateCars, QueryFilterCars } from "@Interfaces/Cars/CarsInterface";
import { Exception } from "@Exceptions/exception";

export class CarsRepository {
  public async getAll(): Promise<CarsModel[]> {
    return await CarsModel.query()
      .where("deleted_at", null)
      .orderBy("id", "desc");
  }

  public async getById(id: number): Promise<CarsModel | undefined> {
    const getCars =  await CarsModel.query()
      .where("deleted_at", null)
      .where("id", id)
      .first()

    if (getCars) {
      return getCars;
    } else {
      throw new Exception("Data not found", 404, {});
    }
  }

  public async getCarsAvailableAll(): Promise<CarsModel[]> {
    return await CarsModel.query()
      .where("deleted_at", null)
      .where("available", true)
      .orderBy("id", "desc");
  }

  public async getCarsAvailableFilter(dataFilter: QueryFilterCars): Promise<CarsModel[]> {
    let resultFilter;
    const availableAtFilter = dataFilter.date + "T" + dataFilter.pickTime;

    if (!dataFilter.totalPassenger) {
      resultFilter = await CarsModel.query()
        .where("deleted_at", null)
        .where("available", true)
        .where("typeDriver", `${dataFilter.typeDriver}`)
        .where("availableAt", ">=", `${availableAtFilter}`);
    } else {
      resultFilter = await CarsModel.query()
        .where("deleted_at", null)
        .where("available", true)
        .where("typeDriver", `${dataFilter.typeDriver}`)
        .where("availableAt", ">=", `${availableAtFilter}`)
        .where("capacity", ">=", `${dataFilter.totalPassenger}`);
    }

    if (resultFilter.length > 0) {
      return resultFilter;
    } else {
      throw new Exception("Data not found", 404, {});
    }
  }

  public async addCars(data: CreateCars): Promise<any> {
    return await CarsModel.query()
      .insert({
        typeDriver: data.typeDriver,
        plate: data.plate,
        manufacture: data.manufacture,
        model: data.model,
        image: data.image,
        rentPerDay: data.rentPerDay,
        capacity: data.capacity,
        description: data.description,
        transmission: data.transmission,
        available: data.available,
        type: data.type,
        year: data.year,
        availableAt: data.availableAt,
        options: data.options,
        specs: data.specs,
        created_at: data.created_at,
      })
      .returning("id");
  }

  public async editCars(id: number, data: UpdateCars): Promise<any> {
    return await CarsModel.query().where("id", id).update({
      typeDriver: data.typeDriver,
      plate: data.plate,
      manufacture: data.manufacture,
      model: data.model,
      image: data.image,
      rentPerDay: data.rentPerDay,
      capacity: data.capacity,
      description: data.description,
      transmission: data.transmission,
      available: data.available,
      type: data.type,
      year: data.year,
      availableAt: data.availableAt,
      options: data.options,
      specs: data.specs,
      updated_at: data.updated_at,
    });
  }

  public async delete(id: number): Promise<Number> {
    return await CarsModel.query().where("id", id).update({
      deleted_at: new Date(),
    });
  }
}
