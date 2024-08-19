import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table: Knex.CreateTableBuilder) => {
    table.increments("id");
    table.string("typeDriver", 255).notNullable();
    table.string("plate", 255).notNullable();
    table.string("manufacture", 255).notNullable();
    table.string("model", 255).notNullable();
    table.text("image").notNullable();
    table.integer("rentPerDay").notNullable();
    table.integer("capacity").notNullable();
    table.text("description").notNullable();
    table.string("transmission", 255).notNullable();
    table.boolean("available").defaultTo(true).notNullable();
    table.string("type").notNullable();
    table.integer("year").notNullable();
    table.timestamp("availableAt").notNullable();
    table.jsonb("options").notNullable();
    table.jsonb("specs").notNullable()
    table.timestamp("created_at");
    table.timestamp("updated_at");
    table.timestamp("deleted_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
