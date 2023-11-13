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
      .limit(100);
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

  /**
   * Create a new product.
   * @param {Object} product - The new product to add.
   * @return {Promise<number>} A promise that resolves to the id of the created product.
   */
  create(review) {
    const query = {
      emp_id: review.emp_id,
      restaurant_id: review.restaurant_id,
      taste_level: review.taste_level,
      speed_level: review.speed_level,
      crowd_level: review.crowd_level,
      recom_people: review.recom_people,
      text: review.text,
      registrate_date: review.registrate_date,
    };
    return knex(REVIEW_TABLE).insert([query]).returning("*");
  },

  /**
   * DELETE a new review.
   * @param {Object} product - The new product to add.
   * @return {Promise<number>} A promise that resolves to the id of the created product.
   */
  delete(review) {
    return knex(REVIEW_TABLE)
      .del()
      .where({
        restaurant_id: review.restaurant_id,
        emp_id: review.emp_id,
      })
      .returning("*");
  },

  /**
   * getByRestaurantIdAndEnmId
   * @param {number} limit - The max number of records to return.
   * @return {Promise<Array>} A promise that resolves to an array products.
   */
  getByRestaurantIdAndEnmId(qRestaurantId, qEmpId) {
    return knex
      .select({
        taste_level: "taste_level",
        speed_level: "speed_level",
        crowd_level: "crowd_level",
        recom_people: "recom_people",
        text: "text",
        registrate_date: "registrate_date",
        change_date: "change_date",
      })
      .from(REVIEW_TABLE)
      .where({ restaurant_id: qRestaurantId, emp_id: qEmpId })
      .limit(100);
  },

  /**
   * PATCH a  review.
   * @param {Object} product - The new product to add.
   * @return {Promise<number>} A promise that resolves to the id of the created product.
   */
  patch(review, param) {
    return knex(REVIEW_TABLE)
      .update(review)
      .where({ restaurant_id: param.restaurant_id, emp_id: param.emp_id })
      .returning("*");
  },
};
