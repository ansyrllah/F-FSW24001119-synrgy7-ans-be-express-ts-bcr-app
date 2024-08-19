import * as Yup from "yup";
import { CreateUsers, UpdateUsers } from "@Interfaces/Users/UsersInterface";
import { Exception } from "@Exceptions/exception";

export class UsersValidationData {
  public CreateUsersValidation(data: CreateUsers): any {
    try {
      const usersSchema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required()
      });

      usersSchema.validateSync(data, { abortEarly: false });
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

  public UpdateUsersValidation(data: UpdateUsers): any {
    try {
      const usersSchema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string(),
      });

      usersSchema.validateSync(data, { abortEarly: false });
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
