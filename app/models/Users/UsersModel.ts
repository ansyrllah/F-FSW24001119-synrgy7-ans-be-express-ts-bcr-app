import { Model, ModelObject } from "objection";

export class UsersModel extends Model {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }
}

export type Users = ModelObject<UsersModel>;
