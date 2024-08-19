import * as Yup from "yup";
import { CreateCars, UpdateCars, QueryFilterCars } from "@Interfaces/Cars/CarsInterface";
import { Exception } from "@Exceptions/exception";

export class CarsValidationData {
  public CreateCarsValidation(data: CreateCars): any {
    try {
      const carsSchema = Yup.object().shape({
        typeDriver: Yup.string().required(),
        plate: Yup.string().required(),
        manufacture: Yup.string().required(),
        model: Yup.string().required(),
        image: Yup.mixed().required(),
        rentPerDay: Yup.number().required().positive().integer(),
        capacity: Yup.number().required().positive().integer(),
        description: Yup.string().required(),
        transmission: Yup.string().required(),
        available: Yup.boolean().required(),
        type: Yup.string().required(),
        year: Yup.number().required().positive().integer(),
        availableAt: Yup.date(),
        options: Yup.string().required(),
        specs: Yup.string().required(),
      });

      carsSchema.validateSync(data, { abortEarly: false });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        throw new Exception("Validation Error", 403, {
          validations: error.inner.map((err) => err.message),
        });
      } else {
        throw new Error((error as Error).message);
      }
    }
  }

  public UpdateCarsValidation(data: UpdateCars): any {
    try {
      const carsSchema = Yup.object().shape({
        typeDriver: Yup.string().required(),
        plate: Yup.string().required(),
        manufacture: Yup.string().required(),
        model: Yup.string().required(),
        image: Yup.mixed().required(),
        rentPerDay: Yup.number().required().positive().integer(),
        capacity: Yup.number().required().positive().integer(),
        description: Yup.string().required(),
        transmission: Yup.string().required(),
        available: Yup.boolean().required(),
        type: Yup.string().required(),
        year: Yup.number().required().positive().integer(),
        availableAt: Yup.date(),
        options: Yup.string().required(),
        specs: Yup.string().required(),
      });

      carsSchema.validateSync(data, { abortEarly: false });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        throw new Exception("Validation Error", 403, {
          validations: error.inner.map((err) => err.message),
        });
      } else {
        throw new Error((error as Error).message);
      }
    }
  }

  public FilterCarsValidation(data: QueryFilterCars): any {
    try {
      const carsSchema = Yup.object().shape({
        typeDriver: Yup.string().required(),
        date: Yup.date().required(),
        pickTime: Yup.string().required(),
        totalPassenger: Yup.number().positive().integer(),
      });

      carsSchema.validateSync(data, { abortEarly: false });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        throw new Exception("Validation Error", 403, {
          validations: error.inner.map((err) => err.message),
        });
      } else {
        throw new Error((error as Error).message);
      }
    }
  }
}
