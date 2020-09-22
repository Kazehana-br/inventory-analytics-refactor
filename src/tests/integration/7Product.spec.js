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

describe("Check Product", () => {
  it("should 200 and index product", async () => {
    const response = await request(app).get("/product-all");
    expect(response.status).toBe(200);
  });

  it("should to create a new product", async () => {
    const response = await request(app).post("/product-create").send({
      Name: "Loja A",
      Size: 100,
    });

    expect(mongoose.Types.ObjectId.isValid(response.body._id)).toBeTruthy();
  });

  it("should to verify that the product has been created", async () => {
    const response = await request(app).get("/product-all");
    expect(mongoose.Types.ObjectId.isValid(response.body[0]._id)).toBeTruthy();
  });
});
