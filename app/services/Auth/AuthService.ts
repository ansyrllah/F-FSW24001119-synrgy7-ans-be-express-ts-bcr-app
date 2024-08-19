import "dotenv/config"
import { UsersModel } from "@Models/Users/UsersModel"
import { LoginAuth, RegisterAuth, AuthJWT,} from "@Interfaces/Auth/AuthInterface";
import { AuthRepository } from "@Repositories/Auth/AuthRepository"
import bcrypt from "bcrypt"
import jwt, { Secret } from 'jsonwebtoken'


export class AuthService {
  public authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  public async login(data: LoginAuth): Promise<AuthJWT> {
    const checkUser: UsersModel = await this.authRepository.checkLogin(data);

    const tokenGenerate = jwt.sign(
      {
        user: checkUser,
      },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return {
      name: checkUser.name,
      email: checkUser.email,
      role: checkUser.role,
      token: tokenGenerate,
      expiresIn: process.env.JWT_EXPIRES_IN,
    };
  }

  public async register(data: RegisterAuth): Promise<any> {
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    data.password = encryptedPassword;
    return await this.authRepository.register(data);
  }
}
