import type { Knex } from "knex";

const config: Knex.Config  = {
  client: "postgresql",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "../database/migrations",
    extension: "ts",
  },
  seeds: {
    directory: "../database/seeds",
    extension: "ts",
  },
}

export default config;
