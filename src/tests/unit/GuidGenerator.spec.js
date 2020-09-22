const mongoose = require("mongoose");
const GuidGenerator = require("../../utils/GuidGenerator");

describe("CHECK GuidGenerator", () => {
  it("should return a valid ObjectId", () => {
    expect(mongoose.Types.ObjectId.isValid(GuidGenerator())).toBeTruthy();
  });
});
