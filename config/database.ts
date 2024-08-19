import knex, { Knex as KnexType } from "knex";
import { Model } from "objection";
import config from "./knex";

const database: KnexType = knex(config);
const databaseConfig: KnexType = Model.knex(database);

export default databaseConfig;
