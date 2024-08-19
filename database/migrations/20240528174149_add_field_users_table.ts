import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("users", (table: Knex.AlterTableBuilder) => {
    table.timestamp("deleted_at").after("updated_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("users", (table: Knex.AlterTableBuilder) => {
    table.dropColumns("deleted_at");
  });
}
