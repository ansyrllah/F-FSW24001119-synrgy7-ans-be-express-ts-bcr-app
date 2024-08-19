import { UsersModel } from "@Models/Users/UsersModel";
import { CreateUsers, UpdateUsers } from "@Interfaces/Users/UsersInterface";
import { Exception } from "@Exceptions/exception";

export class UsersRepository {
  public async getAll(): Promise<UsersModel[]> {
    return await UsersModel.query()
      .where("deleted_at", null);
  }

  public async getById(id: number): Promise<UsersModel | undefined> {
    const getUsers = await UsersModel.query()
      .where("deleted_at", null)
      .where("id", id)
      .first()

    if(getUsers) {
      return getUsers;
    } else {
      throw new Exception("Data not found", 404, {})
    }
  }

  public async addUsers(data: CreateUsers): Promise<any> {
    const checkEmail = await UsersModel.query().where("email", data.email).first();
    
    if (checkEmail != undefined) {
      throw new Exception("Email is already in use, please use another email", 404, {});
    } else {
      return await UsersModel.query().insert({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role.toUpperCase(),
        created_at: data.created_at,
      });
    }
  }

  public async editUsers(id: number, data: UpdateUsers): Promise<any> {
    return await UsersModel.query().where("id", id).update({
      name: data.name,
      email: data.email,
      password: data.password,
      updated_at: data.updated_at,
    });
  }

  public async delete(id: number): Promise<Number> {
    return await UsersModel.query().where("id", id).update({
      deleted_at: new Date(),
    });
  }
}
