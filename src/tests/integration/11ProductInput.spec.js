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
  it("should 200 and index product-input", async () => {
    const response = await request(app).get("/product-input-all");
    expect(response.status).toBe(200);
  });

  it("should to create a first product-input", async () => {
    const product = await request(app).get("/product-all");
    const warehouse = await request(app).get("/product-all");

    const response = await request(app).post("/product-input-create").send({
      Name: "Arroz",
      Product: product.body[0]._id,
      Warehouse: warehouse.body[0]._id,
      Quantity: 100,
      UnityPrice: 20.9,
    });

    expect(response.status).toBe(200);
  });

  it("should to verify that the product-input has been created", async () => {
    const response = await request(app).get("/product-input-all");
    expect(response.body[0].Name).toBe("Arroz");
  });

  it("should to verify the first average cost", async () => {
    const response = await request(app).get("/product-input-all");
    expect(response.body[0].AverageCost).toBe(20.9);
  });

  it("should to create a second product-input", async () => {
    const product = await request(app).get("/product-all");
    const warehouse = await request(app).get("/warehouse-all");

    const response = await request(app).post("/product-input-create").send({
      Name: "Arroz",
      Product: product.body[0]._id,
      Warehouse: warehouse.body[0]._id,
      Quantity: 300,
      UnityPrice: 26.2,
    });

    expect(response.status).toBe(200);
  });

  it("should to verify the second average cost", async () => {
    const response = await request(app).get("/product-input-all");
    expect(response.body[1].AverageCost).toBe(24.875);
  });

  it("should to create a third product-input", async () => {
    const product = await request(app).get("/product-all");
    const warehouse = await request(app).get("/warehouse-all");

    const response = await request(app).post("/product-input-create").send({
      Name: "Arroz",
      Product: product.body[0]._id,
      Warehouse: warehouse.body[0]._id,
      Quantity: 873,
      UnityPrice: 29.8,
    });

    expect(response.status).toBe(200);
  });

  it("should to verify the third average cost", async () => {
    const response = await request(app).get("/product-input-all");
    expect(response.body[2].AverageCost).toBe(28.252474469756482);
  });

  it("should to create a fourth product-input", async () => {
    const product = await request(app).get("/product-all");
    const warehouse = await request(app).get("/warehouse-all");

    const response = await request(app).post("/product-input-create").send({
      Name: "Arroz",
      Product: product.body[0]._id,
      Warehouse: warehouse.body[0]._id,
      Quantity: 100,
      UnityPrice: 26.7,
    });

    expect(response.status).toBe(200);
  });

  it("should to verify the fourth average cost", async () => {
    const response = await request(app).get("/product-input-all");
    expect(response.body[3].AverageCost).toBe(28.139402767662055);
  });
});
