const ArrayIncludes = require("../../utils/ArrayIncludes");

describe("CHECK ArrayIncludes", () => {
  it("should return if object includes in array", async () => {
    const array = [1, 2, 3];
    const object = 2;
    expect(await ArrayIncludes(array, object)).toBeTruthy();
  });
});
