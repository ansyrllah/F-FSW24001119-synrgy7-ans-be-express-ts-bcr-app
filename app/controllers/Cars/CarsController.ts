import { CarsModel } from "@Models/Cars/CarsModel";
import { CreateCars, UpdateCars, CreateCarsLogs, QueryFilterCars } from "@Interfaces/Cars/CarsInterface";
import { Exception } from "@Exceptions/exception";
import { CarsService } from "@Services/Cars/CarsService";
import { CarsLogsService } from "@Services/Cars/CarsLogsService";
import { CarsValidationData } from "@Validations/Cars/CarsValidation";
import { Request, Response } from "express";

export class CarsController {
  public carsService: CarsService;
  public carsLogsService: CarsLogsService;
  public carsValidationData: CarsValidationData;

  constructor(carsService: CarsService, carsLogsService: CarsLogsService) {
    this.carsService = carsService;
    this.carsLogsService = carsLogsService;
    this.carsValidationData = new CarsValidationData();
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const getAllCars: CarsModel[] = await this.carsService.getAll();

      res.status(200).json({
        status: true,
        message: "Success Get All Cars",
        total: getAllCars.length,
        data: {
          cars: getAllCars,
        },
      });
    } catch (error) {
      if (error instanceof Exception) {
        res.status(error.statusCode).json({
          status: false,
          message: error.message,
          data: error.data,
        });
      } else {
        res.status(500).json({
          status: false,
          message: (error as Error).message,
        });
      }
    }
  }

  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const getCarsId: CarsModel | undefined = await this.carsService.getById(Number(req.params.id));
      res.status(200).json({
        status: true,
        message: "Success Get Cars By Id",
        data: {
          cars: getCarsId,
        },
      });
    } catch (error) {
      if (error instanceof Exception) {
        res.status(error.statusCode).json({
          status: false,
          message: error.message,
          data: error.data,
        });
      } else {
        res.status(500).json({
          status: false,
          message: (error as Error).message,
        });
      }
    }
  }

  public async addCars(req: any, res: Response): Promise<void> {
    try {
      const fileBase64: string | undefined = req.file?.buffer.toString("base64");
      const file: string = `data:${req.file?.mimetype};base64,${fileBase64}`;

      const reqData: CreateCars = {
        typeDriver: req.body.typeDriver,
        plate: req.body.plate,
        manufacture: req.body.manufacture,
        model: req.body.model,
        image: req.file,
        rentPerDay: req.body.rentPerDay,
        capacity: req.body.capacity,
        description: req.body.description,
        transmission: req.body.transmission,
        available: req.body.available,
        type: req.body.type,
        year: req.body.year,
        availableAt: req.body.availableAt,
        options: JSON.stringify(req.body.options),
        specs: JSON.stringify(req.body.specs),
        created_at: new Date(),
      };

      const reqAuth: CreateCarsLogs = {
        users_id: req.user.id,
        time_log: new Date(),
        action: "INSERT",
      };
      
      this.carsValidationData.CreateCarsValidation(reqData); // check validation
      await this.carsService.addCars(reqData, reqAuth, file);

      res.status(201).json({
        status: true,
        message: "Success Add Cars",
      });
    } catch (error) {
      if (error instanceof Exception) {
        res.status(error.statusCode).json({
          status: false,
          message: error.message,
          data: error.data,
        });
      } else {
        res.status(500).json({
          status: false,
          message: (error as Error).message,
        });
      }
    }
  }

  public async editCars(req: any, res: Response): Promise<void> {
    try {
      const fileBase64: string | undefined = req.file?.buffer.toString("base64");
      const file: string = `data:${req.file?.mimetype};base64,${fileBase64}`;

      const reqData: UpdateCars = {
        typeDriver: req.body.typeDriver,
        plate: req.body.plate,
        manufacture: req.body.manufacture,
        model: req.body.model,
        image: req.file,
        rentPerDay: req.body.rentPerDay,
        capacity: req.body.capacity,
        description: req.body.description,
        transmission: req.body.transmission,
        available: req.body.available,
        type: req.body.type,
        year: req.body.year,
        availableAt: req.body.availableAt,
        options: JSON.stringify(req.body.options),
        specs: JSON.stringify(req.body.specs),
        updated_at: new Date(),
      };

      const reqAuth: CreateCarsLogs = {
        users_id: req.user.id,
        time_log: new Date(),
        action: "UPDATE",
      };

      await this.carsService.getById(Number(req.params.id)); // check Data Cars By Id
      this.carsValidationData.UpdateCarsValidation(reqData); // check validation
      await this.carsService.editCars(Number(req.params.id), reqData, reqAuth, file);

      res.status(201).json({
        status: true,
        message: "Success Update Cars",
      });
    } catch (error) {
      if (error instanceof Exception) {
        res.status(error.statusCode).json({
          status: false,
          message: error.message,
          data: error.data,
        });
      } else {
        res.status(500).json({
          status: false,
          message: (error as Error).message,
        });
      }
    }
  }

  public async delete(req: any, res: Response): Promise<void> {
    try {
      const reqAuth: CreateCarsLogs = {
        users_id: req.user.id,
        time_log: new Date(),
        action: "DELETE",
      };

      await this.carsService.getById(Number(req.params.id)); // check Data Cars By Id
      await this.carsService.delete(Number(req.params.id), reqAuth);

      res.status(200).json({
        status: true,
        message: "Success Delete Car",
      });
    } catch (error) {
      if (error instanceof Exception) {
        res.status(error.statusCode).json({
          status: false,
          message: error.message,
          data: error.data,
        });
      } else {
        res.status(500).json({
          status: false,
          message: (error as Error).message,
        });
      }
    }
  }

  public async getCarsLogs(req: Request, res: Response): Promise<void> {
    try {
      const getAllCarsLogs: CarsModel[] = await this.carsLogsService.getAllCarsLogs();

      res.status(200).json({
        status: true,
        message: "Success Get All Cars Logs",
        total: getAllCarsLogs.length,
        data: {
          cars: getAllCarsLogs,
        },
      });
    } catch (error) {
      if (error instanceof Exception) {
        res.status(error.statusCode).json({
          status: false,
          message: error.message,
          data: error.data,
        });
      } else {
        res.status(500).json({
          status: false,
          message: (error as Error).message,
        });
      }
    }
  }

  public async getCarsLogsById(req: Request, res: Response): Promise<void> {
    try {
      await this.carsLogsService.checkCarsId(Number(req.params.idCars)); // check Data Cars By Id
      const getCarsLogsId: CarsModel | undefined = await this.carsLogsService.getCarsLogsById(Number(req.params.idCars));

      res.status(200).json({
        status: true,
        message: "Success Get Logs By Cars Id",
        data: {
          cars: getCarsLogsId,
        },
      });
    } catch (error) {
      if (error instanceof Exception) {
        res.status(error.statusCode).json({
          status: false,
          message: error.message,
          data: error.data,
        });
      } else {
        res.status(500).json({
          status: false,
          message: (error as Error).message,
        });
      }
    }
  }

  public async getCarsAvailable(req: Request<{}, {}, {}, QueryFilterCars>, res: Response): Promise<void> {
    try {
      let messageData;
      let getData;
      const reqFilter: QueryFilterCars = {
        typeDriver: req.query.typeDriver,
        date: req.query.date,
        pickTime: req.query.pickTime,
        totalPassenger: req.query.totalPassenger,
      };

      if(!reqFilter.typeDriver && !reqFilter.date && !reqFilter.pickTime && !reqFilter.totalPassenger) {
        getData = await this.carsService.getCarsAvailable();
        messageData = "Success Get All Cars Available";
      }else{
        this.carsValidationData.FilterCarsValidation(reqFilter); // check validation
        getData = await this.carsService.getFilterCarsAvailable(reqFilter);
        messageData = "Success Get Filter All Cars Available";
      }
        
      res.status(200).json({
        status: true,
        message: messageData,
        total: getData.length,
        data: {
          cars: getData,
        },
      });
    } catch (error) {
      if (error instanceof Exception) {
        res.status(error.statusCode).json({
          status: false,
          message: error.message,
          data: error.data,
        });
      } else {
        res.status(500).json({
          status: false,
          message: (error as Error).message,
        });
      }
    }
  }
}
