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

describe("Check Warehouse - Product", () => {
  it("should to link product in warehouse ", async () => {
    const product = await request(app).get("/product-all");
    const warehouse = await request(app).get("/warehouse-all");

    const response = await request(app)
      .post("/warehouse-add-product/" + warehouse.body[0]._id)
      .send({
        Product: product.body[0]._id,
      });
    expect(mongoose.Types.ObjectId.isValid(response.body._id)).toBeTruthy();
  });
});
