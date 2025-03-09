/* eslint-disable security/detect-non-literal-fs-filename */
const request = require("supertest");
const { app } = require("../../../../app");
const v = require("../../../../config").prefix;
const httpCodes = require("../../../../constants/http-codes");
const contactMethods = require("../../../../DB/sample-db/methods/contact");
const { sampleDB } = require("../../../../services/database.service");
const requestAuth = require("../../../../middleware/request-auth.middleware");
const { Unauthorized } = require("../../../../constants/errors");

jest.mock("../../../../middleware/request-auth.middleware");

const requestBody = {
  lastname: "Smith",
  firstname: "John",
  phone: "1234567890",
  email: "john.swh@aretreyamplfdd.com"
};

describe("testing POST /contacts", () => {
  beforeAll(async () => {
    await sampleDB.connect();
  });

  afterAll(async () => {
    await sampleDB.disconnect();
    jest.restoreAllMocks();
  });

  describe("with authorization", () => {
    beforeAll(() => {
      requestAuth.isAuthorized.mockImplementation((req, res, next) => next());
    });

    afterAll(() => {
      jest.resetAllMocks();
    });

    test("success", async () => {
      const { status, body } = await request(app)
        .post(`/${v}/contacts`)
        .send(requestBody);

      expect(status).toBe(httpCodes.CREATED);
      expect(body).toHaveProperty("id");
      expect(body.lastname).toBe("Grimes");
      expect(body.firstname).toBe("Rick");
      expect(body.phone).toBe("79162165588");
    });

    test("error: 422 missing required fields", async () => {
      const invalidBody = { firstname: "Rick" };
      const { status, body } = await request(app)
        .post(`/${v}/contacts`)
        .send(invalidBody);

      expect(status).toBe(httpCodes.UNPROCESSABLE_ENTITY);
      expect(body).toEqual({
        code: "UNPROCESSABLE_ENTITY",
        message: "Missing required fields"
      });
    });
  });

  describe("without authorization", () => {
    beforeAll(() => {
      requestAuth.isAuthorized.mockImplementation((req, res, next) =>
        next(new Unauthorized())
      );
    });

    afterAll(() => {
      jest.resetAllMocks();
    });

    test("error: 401 unauthorized", async () => {
      const { status, body } = await request(app)
        .post(`/${v}/contacts`)
        .send(requestBody);

      expect(status).toBe(httpCodes.UNAUTHORIZED);
      expect(body).toEqual({
        code: "UNAUTHORIZED",
        message: "Unauthorized request"
      });
    });
  });
});
