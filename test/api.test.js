// Back end tests
import request from "request";
import { expect } from "chai";

describe("GitHub API backend tests", () => {
  // Test the getSearchUsers function
  describe("GET /api/searchusers/:name", () => {
    it("should search for users by name", function (done) {
      request(
        "http://localhost:3001/api/searchusers/:name",
        function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        }
      );
    });
  });

  // Test the getUser function
  describe("GET /api/users/:name", () => {
    it("should fetch a single user details", function (done) {
      request(
        "http://localhost:3001/api/users/:name",
        function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        }
      );
    });
  });

  // Test the getRepos function
  describe("GET /api/repos/tom", () => {
    it("should fetch the latest repos for a user", function (done) {
      request(
        "http://localhost:3001/api/repos/tom",
        function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        }
      );
    });
  });
});
