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

describe("Check Supplier", () => {
  it("should 200 and index supplier", async () => {
    const response = await request(app).get("/supplier-all");
    expect(response.status).toBe(200);
  });

  it("should to create a new supplier", async () => {
    const response = await request(app).post("/supplier-create").send({
      Name: "Distribuidora Marquinhos",
      Cnpj: 123456789101,
    });
    expect(mongoose.Types.ObjectId.isValid(response.body._id)).toBeTruthy();
  });

  it("should to verify that the supplier has been created", async () => {
    const response = await request(app).get("/supplier-all");
    expect(mongoose.Types.ObjectId.isValid(response.body[0]._id)).toBeTruthy();
  });
});
