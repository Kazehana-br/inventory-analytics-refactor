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

describe("Check Warehouse - Local", () => {
  it("should to link warehouse in local ", async () => {
    const local = await request(app).get("/local-all");
    const warehouse = await request(app).get("/warehouse-all");

    const response = await request(app)
      .post("/local-add-warehouse/" + local.body[0]._id)
      .send({
        Warehouse: warehouse.body[0]._id,
      });
    expect(mongoose.Types.ObjectId.isValid(response.body._id)).toBeTruthy();
  });
});
