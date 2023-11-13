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
    res.json({ review: result });
  });

  app.post("api/resutaurants/{:restaurant}/reviews", (req, res) => {});

  app.patch("api/resutaurants/{:restaurant}/reviews", (req, res) => {});

  return app;
};

module.exports = { setupServer };
