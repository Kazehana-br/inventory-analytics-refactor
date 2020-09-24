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

describe("Check ProductInput", () => {
  it("should 200 and index product-output", async () => {
    const response = await request(app).get("/product-output-all");
    expect(response.status).toBe(200);
  });

  it("should to create a first product-output", async () => {
    const product = await request(app).get("/product-all");
    const warehouse = await request(app).get("/warehouse-all");

    const response = await request(app).post("/product-output-create").send({
      Name: "Arroz",
      Reason: "Venda",
      Product: product.body[0]._id,
      Warehouse: warehouse.body[0]._id,
      Quantity: 100,
      UnityPrice: 20.9,
    });

    expect(response.status).toBe(200);
  });

  it("should to verify that the product-output has been created", async () => {
    const response = await request(app).get("/product-output-all");
    expect(response.body[0].Name).toBe("Arroz");
  });
});
