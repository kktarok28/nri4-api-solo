/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("employee_info", function (table) {
    table.string("id", 5).primary();
    table.string("name", 255).notNullable();
    table.boolean("retire_flg");
    table.date("registrate_date").notNullable();
    table.date("change_date");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("employee_info");
};

/**
CREATE TABLE employee_info(
    id VARCHAR(5) PRIMARY KEY,
    name VARCHAR(255),
    retire_flg BOOLEAN,
    registrate_date DATE,
    change_date DATE
)
**/
