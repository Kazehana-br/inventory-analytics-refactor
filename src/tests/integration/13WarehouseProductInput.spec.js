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

describe("Check Warehouse - ProductInput", () => {
  it("should to link product-input in warehouse ", async () => {
    const productInput = await request(app).get("/product-input-all");
    const warehouse = await request(app).get("/warehouse-all");

    const response = await request(app)
      .post("/warehouse-add-product-input/" + warehouse.body[0]._id)
      .send({
        IdProductInput: productInput.body[0]._id,
      });
    expect(mongoose.Types.ObjectId.isValid(response.body._id)).toBeTruthy();
  });
});
