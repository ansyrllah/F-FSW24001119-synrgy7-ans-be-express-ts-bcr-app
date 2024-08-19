import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars_logs").del();

  // Inserts seed entries
  await knex("cars_logs").insert([
    {
      cars_id: 1,
      users_id: 1,
      time_log: new Date(),
      action: "INSERT",
    },
    {
      cars_id: 2,
      users_id: 1,
      time_log: new Date(),
      action: "INSERT",
    },
    {
      cars_id: 3,
      users_id: 1,
      time_log: new Date(),
      action: "INSERT",
    },
  ]);
}
