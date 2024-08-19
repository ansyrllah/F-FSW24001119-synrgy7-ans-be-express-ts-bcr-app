import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
  id!: number;
  typeDriver!: string;
  plate!: string;
  manufacture!: string;
  model!: string;
  image!: string;
  rentPerDay!: number;
  capacity!: number;
  description!: string;
  transmission!: string;
  available!: Boolean;
  type!: string;
  year!: number;
  availableAt!: Date;
  options!: string;
  specs!: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  message?: string;

  static get tableName() {
    return "cars";
  }

  static get idColumn() {
    return "id";
  }

  static relationMappings = {
    carsLogs: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname.replace("Cars", "")}/Cars/CarsLogsModel`,
      join: {
        from: "cars.id",
        to: "cars_logs.cars_id",
      },
    },
  };
}

export type Cars = ModelObject<CarsModel>;
