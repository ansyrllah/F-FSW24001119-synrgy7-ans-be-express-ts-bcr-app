import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      name: "superadmin",
      email: "superadmin@mail.com",
      password: await bcrypt.hash("superadmin", 10),
      role: "SUPERADMIN",
      created_at: new Date(),
    },
    {
      name: "admin",
      email: "admin@mail.com",
      password: await bcrypt.hash("admin", 10),
      role: "ADMIN",
      created_at: new Date(),
    },
    {
      name: "member",
      email: "member@mail.com",
      password: await bcrypt.hash("member", 10),
      role: "MEMBER",
      created_at: new Date(),
    },
    {
      name: "member inactive",
      email: "member1@mail.com",
      password: await bcrypt.hash("member1", 10),
      role: "MEMBER",
      created_at: new Date(),
      deleted_at: new Date(),
    },
  ]);
}
