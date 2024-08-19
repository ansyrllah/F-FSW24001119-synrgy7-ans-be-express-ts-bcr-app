import { UsersModel } from "@Models/Users/UsersModel";
import { CreateUsers, UpdateUsers } from "@Interfaces/Users/UsersInterface";
import { UsersService } from "@Services/Users/UsersService";
import { Exception } from "@Exceptions/exception";
import { UsersValidationData } from "@Validations/Users/UsersValidation";
import { Request, Response } from "express";

export class UsersController {
  public usersService: UsersService;
  public usersValidationData: UsersValidationData;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
    this.usersValidationData = new UsersValidationData();
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const getAllUsers: UsersModel[] = await this.usersService.getAll();

      res.status(200).json({
        status: true,
        message: "Success Get All Users",
        total: getAllUsers.length,
        data: {
          users: getAllUsers,
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
      const getUsersId: UsersModel | undefined = await this.usersService.getById(Number(req.params.id));
      res.status(200).json({
        status: true,
        message: "Success Get Users By Id",
        data: {
          users: getUsersId,
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

  public async addUsers(req: Request, res: Response): Promise<void> {
    try {
      const reqData: CreateUsers = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        created_at: new Date(),
      };

      this.usersValidationData.CreateUsersValidation(reqData); // check validation
      await this.usersService.addUsers(reqData);

      res.status(201).json({
        status: true,
        message: "Success Add Users",
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

  public async editUsers(req: Request, res: Response): Promise<void> {
    try {
      const reqData: UpdateUsers = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        updated_at: new Date(),
      };

      await this.usersService.getById(Number(req.params.id)); // check Data Users By Id
      this.usersValidationData.UpdateUsersValidation(reqData); // check validation
      await this.usersService.editUsers(Number(req.params.id), reqData);

      res.status(201).json({
        status: true,
        message: "Success Update Users",
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

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.usersService.getById(Number(req.params.id)); // check Data Users By Id
      await this.usersService.delete(Number(req.params.id));

      res.status(200).json({
        status: true,
        message: "Success Delete Users",
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
