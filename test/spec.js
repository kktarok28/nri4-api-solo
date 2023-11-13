const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
const expect = chai.expect;

const server = setupServer();

describe("API TEST", () => {
  let request;
  beforeEach(() => {
    request = chai.request(server);
  });

  describe("GET /api/resutaurants/:restaurant/reviews ", () => {
    it("should greturn review of restaurant 1 by restaurant id", async () => {
      const res = await request.get("/api/resutaurants/1/reviews");
      const expectedResult = {
        emp_id: "f3343",
        restaurant_id: 1,
        taste_level: 3,
        speed_level: 3,
        crowd_level: 3,
        recom_people: 6,
        text: "店長が良い",
        registrate_date: new Date(),
      };
      const actual = JSON.parse(res.text);
      expect(actual.reviewList[0].emp_id).to.equal(expectedResult.emp_id);
      expect(actual.reviewList[0].restaurant_id).to.equal(
        expectedResult.restaurant_id
      );
      expect(actual.reviewList[0].taste_level).to.equal(
        expectedResult.taste_level
      );
      expect(actual.reviewList[0].speed_level).to.equal(
        expectedResult.speed_level
      );
      expect(actual.reviewList[0].crowd_level).to.equal(
        expectedResult.crowd_level
      );
      expect(actual.reviewList[0].recom_people).to.equal(
        expectedResult.recom_people
      );
      expect(actual.reviewList[0].text).to.equal(expectedResult.text);
      expect(actual.reviewList[0]).to.have.own.property("registrate_date");
    });
  });

  describe("GET /api/resutaurants/reviews ", () => {
    it("should greturn review of restaurant 1 by restaurant id", async () => {
      const res = await request.get("/api/resutaurants/reviews");
      const actual = JSON.parse(res.text);
      const expectedResult = {
        restaurant_id: 1,
        taste_level: "3.00",
        speed_level: "3.00",
        crowd_level: "3.00",
      };
      expect(actual.reviewList[0].restaurant_id).to.equal(
        expectedResult.restaurant_id
      );
      expect(actual.reviewList[0].taste_level).to.equal(
        expectedResult.taste_level
      );
      expect(actual.reviewList[0].speed_level).to.equal(
        expectedResult.speed_level
      );
      expect(actual.reviewList[0].crowd_level).to.equal(
        expectedResult.crowd_level
      );
    });

    describe("POST api/resutaurants/{:restaurant}/reviews/users/{:user} ", () => {
      it("should insert review of restautrant 2 user f3340", async () => {
        const expectedResult = {
          emp_id: "f3340",
          restaurant_id: 2,
          taste_level: 3,
          speed_level: 3,
          crowd_level: 3,
          recom_people: 6,
          text: "店長が良い",
          registrate_date: "2023-11-12T15:00:00.000Z",
          change_date: null,
        };
        const res = await request
          .post("/api/restaurants/2/reviews/users/f3340")
          .send(expectedResult);
        const actual = JSON.parse(res.text);

        expect(actual.review.emp_id).to.equal(expectedResult.emp_id);
        expect(actual.review.restaurant_id).to.equal(
          expectedResult.restaurant_id
        );
        expect(actual.review.taste_level).to.equal(expectedResult.taste_level);
        expect(actual.review.speed_level).to.equal(expectedResult.speed_level);
        expect(actual.review.crowd_level).to.equal(expectedResult.crowd_level);
        expect(actual.review.recom_people).to.equal(
          expectedResult.recom_people
        );
        expect(actual.review.text).to.equal(expectedResult.text);
        expect(actual.review).to.have.own.property("registrate_date");
      });
    });

    describe("PATCH api/resutaurants/{:restaurant}/reviews/users/{:user} ", () => {
      it("should insert review of restautrant 2 user f3340", async () => {
        const inputBody = {
          recom_people: 12,
        };
        const expectedResult = {
          emp_id: "f3340",
          restaurant_id: 2,
          taste_level: 3,
          speed_level: 3,
          crowd_level: 3,
          recom_people: 12,
          text: "店長が良い",
          registrate_date: "2023-11-12T15:00:00.000Z",
          change_date: null,
        };
        const res = await request
          .patch("/api/restaurants/2/reviews/users/f3340")
          .send(inputBody);
        const actual = JSON.parse(res.text);

        expect(actual.review.emp_id).to.equal(expectedResult.emp_id);
        expect(actual.review.restaurant_id).to.equal(
          expectedResult.restaurant_id
        );
        expect(actual.review.taste_level).to.equal(expectedResult.taste_level);
        expect(actual.review.speed_level).to.equal(expectedResult.speed_level);
        expect(actual.review.crowd_level).to.equal(expectedResult.crowd_level);
        expect(actual.review.recom_people).to.equal(
          expectedResult.recom_people
        );
        expect(actual.review.text).to.equal(expectedResult.text);
        expect(actual.review).to.have.own.property("registrate_date");
      });
    });

    describe("DELETE api/resutaurants/{:restaurant}/reviews/users/{:user} ", () => {
      let before, after;
      it("should delete review of restautrant 2 user f3340", async () => {
        const res = await request.get("/api/resutaurants/2/reviews");
        before = JSON.parse(res.text);
      });

      it("should delete review of restautrant 2 user f3340", async () => {
        await request.delete("/api/restaurants/2/reviews/users/f3340");
      });

      it("should delete review of restautrant 2 user f3340", async () => {
        const res = await request.get("/api/resutaurants/2/reviews");
        after = JSON.parse(res.text);
        expect(after.reviewList.length).to.equal(before.reviewList.length - 1);
      });
    });
  });
});
