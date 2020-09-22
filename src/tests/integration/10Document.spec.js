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

describe("Check Document", () => {
  it("should 200 and index document", async () => {
    const response = await request(app).get("/document-all");
    expect(response.status).toBe(200);
  });

  it("should to create a new document", async () => {
    const response = await request(app).post("/document-create").send({
      Name: "Nota Fiscal de Entrada - 0223",
      Date: new Date(),
      Url:
        "https://camara.fgv.br/sites/camara.fgv.br/files/artigos/teste33_0_3.pdf",
    });
    expect(response.status).toBe(200);
  });

  it("should to verify that the document has been created", async () => {
    const response = await request(app).get("/document-all");
    expect(response.body[0].Name).toBe("Nota Fiscal de Entrada - 0223");
  });
});
