const mongoose = require("mongoose");
const { app, server } = require("../../app");
const request = require("supertest");
beforeAll(async () => {
  await mongoose.disconnect();
  await mongoose.connect(process.env.mongotests, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async (done) => {
  server.close(); // CLOSE THE SERVER CONNECTION
  await new Promise((resolve) => setTimeout(() => resolve(), 500));
  done();
});

describe("Check Warehouse - ProductOutput", () => {
  it("should to link product-output in warehouse ", async () => {
    const productOutput = await request(app).get("/product-output-all");
    const warehouse = await request(app).get("/warehouse-all");

    const response = await request(app)
      .post("/warehouse-add-product-output/" + warehouse.body[0]._id)
      .send({
        ProductOutput: productOutput.body[0]._id,
      });
    expect(mongoose.Types.ObjectId.isValid(response.body._id)).toBeTruthy();
  });
});
