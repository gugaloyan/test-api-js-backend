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

describe("testing PATCH /contacts/:id", () => {
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
        .patch(`/${v}/contacts/16`)
        .send(requestBody);

      expect(status).toBe(httpCodes.OK);
      expect(body).toHaveProperty("id", 16);
      expect(body.lastname).toBe("Grimes");
      expect(body.firstname).toBe("Rick");
    });

    test("error: 404 contact not found", async () => {
      const { status, body } = await request(app)
        .patch(`/${v}/contacts/1`)
        .send(requestBody);

      expect(status).toBe(httpCodes.NOT_FOUND);
      expect(body).toEqual({
        code: "NOT_FOUND",
        message: "Contact not found"
      });
    });

    test("error: 422 id parameter has incorrect format", async () => {
      const { status, body } = await request(app)
        .patch(`/${v}/contacts/abc`)
        .send(requestBody);

      expect(status).toBe(httpCodes.UNPROCESSABLE_ENTITY);
      expect(body).toEqual({
        code: "UNPROCESSABLE_ENTITY",
        message: "id: parameter has incorrect format"
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
        .patch(`/${v}/contacts/16`)
        .send(requestBody);

      expect(status).toBe(httpCodes.UNAUTHORIZED);
      expect(body).toEqual({
        code: "UNAUTHORIZED",
        message: "Unauthorized request"
      });
    });
  });
});
