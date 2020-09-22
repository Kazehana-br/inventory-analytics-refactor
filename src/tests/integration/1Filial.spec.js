const mongoose = require("mongoose");
const { app, server } = require("../../app");
const request = require("supertest");

beforeAll(async () => {
  await mongoose.disconnect();
  await mongoose.connect(
    process.env.mongotests,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      mongoose.connection.db.dropDatabase();
    }
  );
});

afterAll(async (done) => {
  server.close(); // CLOSE THE SERVER CONNECTION
  await new Promise((resolve) => setTimeout(() => resolve(), 500));
  done();
});

describe("Check Filial ", () => {
  it("should 200 and index filial", async () => {
    const response = await request(app).get("/filial-all");
    expect(response.status).toBe(200);
  });

  it("should to create a new filial", async () => {
    const response = await request(app).post("/filial-create").send({
      Name: "Loja PontaGrossa",
    });
    expect(response.status).toBe(200);
  });

  it("should to verify that the filial has been created", async () => {
    const response = await request(app).get("/filial-all");
    expect(response.body[0].Name).toBe("Loja PontaGrossa");
  });
});
