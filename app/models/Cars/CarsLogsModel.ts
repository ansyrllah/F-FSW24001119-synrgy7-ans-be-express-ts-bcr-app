import { Model, ModelObject } from "objection";

export class CarsLogsModel extends Model {
  id!: number;
  cars_id!: number;
  users_id!: number;
  time_log!: Date;
  action!: string;

  static get tableName() {
    return "cars_logs";
  }

  static get idColumn() {
    return "id";
  }

  static relationMappings = {
    cars: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname.replace("Cars", "")}/Cars/CarsModel`,
      join: {
        from: "cars_logs.cars_id",
        to: "cars.id",
      },
    },
    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname.replace("Cars", "")}/Users/UsersModel`,
      join: {
        from: "cars_logs.users_id",
        to: "users.id",
      },
    },
  };
}

export type CarsLogs = ModelObject<CarsLogsModel>;
