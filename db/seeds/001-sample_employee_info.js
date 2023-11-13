/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries

  await knex("review").del();
  await knex("employee_info").del();
  await knex("employee_info").insert([
    {
      id: "f3343",
      name: "Kobayashi",
      retire_flg: false,
      registrate_date: new Date(),
    },
    {
      id: "f3340",
      name: "NOMURA",
      retire_flg: false,
      registrate_date: new Date(),
    },
  ]);
};
