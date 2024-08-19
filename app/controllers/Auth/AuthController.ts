import { LoginAuth, RegisterAuth, AuthJWT } from "@Interfaces/Auth/AuthInterface";
import { Exception } from "@Exceptions/exception";
import { AuthService } from "@Services/Auth/AuthService";
import { AuthValidationData } from "@Validations/Auth/AuthValidation";
import { Request, Response } from "express";

export class AuthController {
  public authService: AuthService;
  public authValidationData: AuthValidationData;

  constructor(authService: AuthService) {
    this.authService = authService;
    this.authValidationData = new AuthValidationData();
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const reqData: LoginAuth = {
        email: req.body.email,
        password: req.body.password,
      };

      this.authValidationData.LoginAuthValidation(reqData); // check validation
      const getAuthLogin: AuthJWT = await this.authService.login(reqData);

      res.status(201).json({
        status: true,
        message: "Success Login",
        data: {
          users: getAuthLogin,
        },
      });
    } catch (error) {
      if(error instanceof Exception) {
        res.status(error.statusCode).json({
          status: false,
          message: error.message,
          data: error.data
        })
      } else {
        res.status(500).json({
          status: false,
          message: (error as Error).message,
        });
      }
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const reqData: RegisterAuth = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: "MEMBER",
        created_at: new Date(),
      }

      this.authValidationData.RegisterAuthValidation(reqData); // check validation
      await this.authService.register(reqData);

      res.status(201).json({
        status: true,
        message: "Success Register",
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

  public async currentUser(req: any, res: Response): Promise<void> {
    try {
      res.status(200).json({
        status: true,
        message: "Success Get Current User",
        data: {
          users: {
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
          },
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
