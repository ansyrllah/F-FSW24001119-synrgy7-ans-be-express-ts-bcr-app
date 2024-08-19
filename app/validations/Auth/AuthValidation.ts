import * as Yup from "yup";
import { LoginAuth, RegisterAuth } from "@Interfaces/Auth/AuthInterface";
import { Exception } from "@Exceptions/exception";

export class AuthValidationData {
  public LoginAuthValidation(data: LoginAuth): any {
    try {
      const authSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      authSchema.validateSync(data, { abortEarly: false });
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

  public RegisterAuthValidation(data: RegisterAuth): any {
    try {
      const authSchema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      authSchema.validateSync(data, { abortEarly: false });
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
