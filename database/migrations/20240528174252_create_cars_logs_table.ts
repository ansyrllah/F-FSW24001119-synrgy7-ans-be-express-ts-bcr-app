import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars_logs", (table: Knex.CreateTableBuilder) => {
    table.increments("id");
    table.integer("cars_id").notNullable().unsigned();
    table.integer("users_id").notNullable().unsigned();
    table.timestamp("time_log").notNullable();
    table.string("action").notNullable();
    table.foreign("cars_id").references("cars.id").onUpdate('cascade').onDelete('cascade');
    table.foreign("users_id").references("users.id").onUpdate('cascade').onDelete('cascade');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("cars_logs");
}