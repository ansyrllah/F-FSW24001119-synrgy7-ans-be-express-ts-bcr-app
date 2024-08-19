import { UsersModel } from "@Models/Users/UsersModel";
import { CreateUsers, UpdateUsers } from "@Interfaces/Users/UsersInterface";
import { UsersRepository } from "@Repositories/Users/UsersRepository";
import bcrypt from "bcrypt";

export class UsersService {
  public usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  public async getAll(): Promise<UsersModel[]> {
    return await this.usersRepository.getAll();
  }

  public async getById(id: number): Promise<UsersModel | undefined> {
    return await this.usersRepository.getById(id);
  }

  public async addUsers(data: CreateUsers): Promise<any> {
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    data.password = encryptedPassword;
    return await this.usersRepository.addUsers(data);   
  }

  public async editUsers(id: number, data: UpdateUsers): Promise<any> {
    if(data.password) {
      const encryptedPassword = await bcrypt.hash(data.password, 10);
      data.password = encryptedPassword;
    }
    return await this.usersRepository.editUsers(id, data);
  }

  public async delete(id: number): Promise<Number> {
    return await this.usersRepository.delete(id);
  }
}
