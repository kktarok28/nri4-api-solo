/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("review", function (table) {
    table.string("emp_id", 5).notNullable().references("employee_info.id");
    table
      .integer("restaurant_id")
      .notNullable()
      .references("restaurant_info.id");
    table.integer("taste_level").notNullable();
    table.integer("speed_level").notNullable();
    table.integer("crowd_level").notNullable();
    table.integer("recom_people");
    table.string("text", 255);
    table.date("registrate_date").notNullable();
    table.date("change_date");
    table.unique(["emp_id", "restaurant_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("review");
};

/**
CREATE TABLE review (
    emp_id INT NOT NULL REFERENCES employee_info(id),,
    restaurant_id NOT NULL REFERENCES restaurant_info(id),, 
    taste_lebel INT NOT NULL,
    speed_lebel INT NOT NULL,
    crowd_lebel INT NOT NULL,
    recom_people INT ,
    text VARCHAR(255) ,
    registrate_date DATE NOT NULL,
    change_date DATE,
    PRIMARY KEY (emp_id,restaurant_id)
)

 */
