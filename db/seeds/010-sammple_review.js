exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("review").del();

  // Insert seed entries
  await knex("review").insert([
    {
      emp_id: "03343",
      restaurant_id: 1,
      taste_level: 3,
      speed_level: 3,
      crowd_level: 3,
      recom_people: 6,
      text: "店長が良い",
      registrate_date: new Date(),
    },
    {
      emp_id: "99999",
      restaurant_id: 1,
      taste_level: 3,
      speed_level: 3,
      crowd_level: 3,
      recom_people: 6,
      text: "店長が良い",
      registrate_date: new Date(),
    },
  ]);
};
