import { UsersModel } from "@Models/Users/UsersModel";
import { LoginAuth, RegisterAuth } from "@Interfaces/Auth/AuthInterface";
import bcrypt from "bcrypt";
import { Exception } from "@Exceptions/exception";

export class AuthRepository {
  public async checkLogin(data: LoginAuth): Promise<UsersModel> {
    const checkUser = await UsersModel.query().where("email", data.email).first();

    if (checkUser === undefined) {
      throw new Exception("Email not found", 404, {});
    }

    const checkPassword = await bcrypt.compare(
      data.password,
      checkUser.password
    );
    
    if (!checkPassword) {
      throw new Exception("Wrong password", 401, {});
    }

    if (checkUser.deleted_at !== null) {
      throw new Exception("Your account is inactive", 403, {});
    }

    return checkUser;
  }

  public async register(data: RegisterAuth): Promise<any> {
    const checkEmail = await UsersModel.query().where("email", data.email).first();

    if (checkEmail != undefined) {
      throw new Exception("Email is already in use, please use another email", 404, {});
    } else {
      return await UsersModel.query().insert({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        created_at: data.created_at,
      });
    }
  }
}
