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

describe("Check Local", () => {
  it("should 200 and index local", async () => {
    const response = await request(app).get("/local-all");
    expect(response.status).toBe(200);
  });

  it("should to create a new local", async () => {
    const response = await request(app).post("/local-create").send({
      Name: "Barracao-SUL",
    });
    expect(response.status).toBe(200);
  });

  it("should to verify that the local has been created", async () => {
    const response = await request(app).get("/local-all");
    expect(response.body[0].Name).toBe("Barracao-SUL");
  });
});
