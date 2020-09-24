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

describe("Check ProductOutput - Document", () => {
  it("should to link document in product-input ", async () => {
    const productOutput = await request(app).get("/product-output-all");
    const document = await request(app).get("/document-all");

    const response = await request(app)
      .post("/product-output-add-document/" + productOutput.body[0]._id)
      .send({
        Document: document.body[0]._id,
      });
    expect(mongoose.Types.ObjectId.isValid(response.body._id)).toBeTruthy();
  });
});
