const knex = require("../kenex");

const REVIEW_TABLE = "review";

module.exports = {
  REVIEW_TABLE,

  /**
   * getAveragePerRestaurant
   * @param {number} limit - The max number of records to return.
   * @return {Promise<Array>} A promise that resolves to an array products.
   */
  getByRestaurantId(qRestaurantId) {
    return knex
      .select({
        emp_id: "emp_id",
        restaurant_id: "restaurant_id",
        taste_level: "taste_level",
        speed_level: "speed_level",
        crowd_level: "crowd_level",
        recom_people: "recom_people",
        text: "text",
        registrate_date: "registrate_date",
        change_date: "change_date",
      })
      .from(REVIEW_TABLE)
      .where({ restaurant_id: qRestaurantId })
      .limit(100)
      .first(1);
  },

  /**
   * getAveragePerRestaurant
   * @param {number} limit - The max number of records to return.
   * @return {Promise<Array>} A promise that resolves to an array products.
   */
  getAveragePerRestaurant() {
    return knex
      .select({
        restaurant_id: "restaurant_id",
        taste_level: knex.raw("ROUND(AVG(taste_level),2)"),
        speed_level: knex.raw("ROUND(AVG(speed_level),2)"),
        crowd_level: knex.raw("ROUND(AVG(crowd_level),2)"),
      })
      .from(REVIEW_TABLE)
      .groupBy("restaurant_id");
  },
};
