const express = require("express");
const reviewModel = require("./review/review.model");
const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.text());

  app.get("/api/resutaurants/reviews", async (req, res) => {
    const q = req.params.restaurant;
    const result = await reviewModel.getAveragePerRestaurant();
    res.json({ reviewList: result });
  });

  app.get("/api/resutaurants/:restaurant/reviews", async (req, res) => {
    const q = req.params.restaurant;
    const result = await reviewModel.getByRestaurantId(parseInt(q));
    res.json({ reviewList: result });
  });

  app.post(
    "/api/restaurants/:restaurantId/reviews/users/:userId",
    async (req, res) => {
      const reqDto = {
        restaurant_id: parseInt(parseInt(req.params.restaurantId)),
        emp_id: req.params.userId,
        taste_level: req.body.taste_level,
        speed_level: req.body.speed_level,
        crowd_level: req.body.crowd_level,
        recom_people: req.body.recom_people,
        text: req.body.text,
        registrate_date: new Date(),
      };
      console.log(reqDto);
      const result = await reviewModel.create(reqDto);
      res.json({ review: result[0] });
    }
  );

  app.delete(
    "/api/restaurants/:restaurantId/reviews/users/:userId",
    (req, res) => {}
  );

  app.patch(
    "/api/restaurants/:restaurantId/reviews/users/:userId",
    (req, res) => {}
  );

  return app;
};

module.exports = { setupServer };
