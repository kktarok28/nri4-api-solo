/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("restaurant_info", function (table) {
    table.integer("id").primary();
    table.string("name", 255).notNullable();
    table.string("address", 32).notNullable();
    table.string("type_1", 100);
    table.string("type_2", 100);
    table.string("type_3", 100);
    table.string("budget", 255);
    table.string("reg_horiday", 255);
    table.string("payment", 5);
    table.integer("num_seat");
    table.boolean("close_flg");
    table.date("registrate_date").notNullable();
    table.date("change_date");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("restaurant_info");
};

/**


CREATE TABLE restaurant_info(
    id INT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    type_1 VARCHAR(3),
    type_2 VARCHAR(4),
    type_3 VARCHAR(5),
    budget VARCHAR(2),
    reg_horiday VARCHAR(1),
    payment VARCHAR(3),
    num_seat INT,
    close_flg BOOLEAN,
    registrate_date DATE,
    change_date DATE
)
 */
