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

describe("Check Warehouse", () => {
  it("should 200 and index warehouse", async () => {
    const response = await request(app).get("/warehouse-all");
    expect(response.status).toBe(200);
  });

  it("should to create a new warehouse", async () => {
    const local = await request(app).get("/local-all");
    const filial = await request(app).get("/filial-all");

    const response = await request(app).post("/warehouse-create").send({
      WarehouseType: 1,
      Local: local.body[0]._id,
      Filial: filial.body[0]._id,
    });
    expect(response.status).toBe(200);
  });

  it("should to verify that the warehouse has been created", async () => {
    const response = await request(app).get("/warehouse-all");
    expect(mongoose.Types.ObjectId.isValid(response.body[0]._id)).toBeTruthy();
  });
});
