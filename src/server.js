const express = require("express");
const path = require("path");
const reviewModel = require("./review/review.model");
const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.text());
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/api/resutaurants/reviews/users/:userId", async (req, res) => {
    const q = req.params.userId;
    const aveList = await reviewModel.getAveragePerRestaurant();
    const resList = await Promise.all(
      aveList.map(async (review) => {
        const param = {
          restaurant_id: review.restaurant_id,
          emp_id: req.params.userId,
        };
        const result = await reviewModel.getByRestaurantId(param);
        if (typeof result[0]?.restaurant_id !== "undefined") {
          return {
            ...review,
            own_taste_level: result[0].taste_level,
            own_speed_level: result[0].speed_level,
            own_crowd_level: result[0].crowd_level,
          };
        } else {
          return {
            ...review,
            own_taste_level: null,
            own_speed_level: null,
            own_crowd_level: null,
          };
        }
      })
    );
    res.json({ reviewList: resList });
  });

  app.get("/restaurant_review", async (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  app.get(
    "/api/resutaurants/:restaurantId/reviews/users/:userId",
    async (req, res) => {
      const param = {
        restaurant_id: parseInt(parseInt(req.params.restaurantId)),
        emp_id: req.params.userId,
      };
      const result = await reviewModel.getByRestaurantId(param);
      res.json({ review: result[0] });
    }
  );

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
      const result = await reviewModel.create(reqDto);
      res.json({ review: result[0] });
    }
  );

  app.patch(
    "/api/restaurants/:restaurantId/reviews/users/:userId",
    async (req, res) => {
      const param = {
        restaurant_id: parseInt(parseInt(req.params.restaurantId)),
        emp_id: req.params.userId,
      };

      const changeDate = { change_date: new Date() };
      const result = await reviewModel.patch(
        { ...req.body, ...changeDate },
        param
      );
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
