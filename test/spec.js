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

  describe("/api/resutaurants/:restaurant/reviews ", () => {
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
      expect(actual.review.emp_id).to.equal(expectedResult.emp_id);
      expect(actual.review.restaurant_id).to.equal(
        expectedResult.restaurant_id
      );
      expect(actual.review.taste_level).to.equal(expectedResult.taste_level);
      expect(actual.review.speed_level).to.equal(expectedResult.speed_level);
      expect(actual.review.crowd_level).to.equal(expectedResult.crowd_level);
      expect(actual.review.recom_people).to.equal(expectedResult.recom_people);
      expect(actual.review.text).to.equal(expectedResult.text);
      expect(actual.review).to.have.own.property("registrate_date");
    });
  });

  describe("/api/resutaurants/reviews ", () => {
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
  });
});
