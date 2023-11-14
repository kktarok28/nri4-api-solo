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
      id: "03343",
      name: "NOMURA",
      retire_flg: false,
      registrate_date: new Date(),
    },
    {
      id: "03340",
      name: "NOMURA",
      retire_flg: false,
      registrate_date: new Date(),
    },
    {
      id: "99999",
      name: "NOMURA",
      retire_flg: false,
      registrate_date: new Date(),
    },
  ]);
};
