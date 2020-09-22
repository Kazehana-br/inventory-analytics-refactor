const mongoose = require("mongoose");
const Logging = require("../../utils/Logging");

describe("CHECK Logging to ElasticSearch", () => {
  it("should return true if logged in", async () => {
    const response = await Logging.Error("Unit Test for error logging");
    expect(response).toBeTruthy();
  });
});
