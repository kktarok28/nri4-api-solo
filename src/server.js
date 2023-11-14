const express = require("express");
const path = require("path");
const reviewModel = require("./review/review.model");
const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.text());
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/restaurant_review", async (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  app.get("/api/resutaurants/reviews/users/:userId", async (req, res) => {
    const aveList = await reviewModel.getAveragePerRestaurant();
    const resList = await Promise.all(
      aveList.map(async (review) => {
        const pathParam = {
          restaurant_id: review.restaurant_id,
          emp_id: req.params.userId,
        };
        const result = await reviewModel.getByRestaurantId(pathParam);
        return {
          ...review,
          own_taste_level: result[0]?.taste_level || null,
          own_speed_level: result[0]?.speed_level || null,
          own_crowd_level: result[0]?.crowd_level || null,
        };
      })
    );
    res.json({ reviewList: resList });
  });

  app.get(
    "/api/resutaurants/:restaurantId/reviews/users/:userId",
    async (req, res) => {
      const pathParam = {
        restaurant_id: parseInt(parseInt(req.params.restaurantId)),
        emp_id: req.params.userId,
      };
      const result = await reviewModel.getByRestaurantId(pathParam);
      res.json({ review: result[0] });
    }
  );

  app.post(
    "/api/restaurants/:restaurantId/reviews/users/:userId",
    async (req, res) => {
      const pathParam = {
        restaurant_id: parseInt(parseInt(req.params.restaurantId)),
        emp_id: req.params.userId,
      };

      const reqDto = {
        ...pathParam,
        ...req.body,
        registrate_date: new Date(),
        change_date: null,
      };
      const result = await reviewModel.create(reqDto);
      res.json({ review: result[0] });
    }
  );

  app.patch(
    "/api/restaurants/:restaurantId/reviews/users/:userId",
    async (req, res) => {
      const pathParam = {
        restaurant_id: parseInt(parseInt(req.params.restaurantId)),
        emp_id: req.params.userId,
      };
      const body = { ...req.body, change_date: new Date() };
      const result = await reviewModel.patch(body, pathParam);
      res.status(200).json({ review: result[0] });
    }
  );

  app.delete(
    "/api/restaurants/:restaurantId/reviews/users/:userId",
    async (req, res) => {
      const reqDto = {
        restaurant_id: parseInt(parseInt(req.params.restaurantId)),
        emp_id: req.params.userId,
      };
      await reviewModel.delete(reqDto);
      res.status(200).json({});
    }
  );
  return app;
};

module.exports = { setupServer };
