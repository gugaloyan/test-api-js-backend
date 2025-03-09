/* eslint-disable security/detect-non-literal-fs-filename */
const request = require("supertest");
const { app } = require("../../../../app");
const v = require("../../../../config").prefix;
const httpCodes = require("../../../../constants/http-codes");
const { sampleDB } = require("../../../../services/database.service");
const requestAuth = require("../../../../middleware/request-auth.middleware");
const { Unauthorized } = require("../../../../constants/errors");

jest.mock("../../../../middleware/request-auth.middleware");

describe("testing GET /contacts", () => {
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
        .get(`/${v}/contacts`);

      expect(status).toBe(httpCodes.OK);
      expect(Array.isArray(body)).toBe(true);
    });

    test("error: 404 no contacts found", async () => {
      const { status, body } = await request(app)
        .get(`/${v}/contacts`);

      expect(status).toBe(httpCodes.NOT_FOUND);
      expect(body).toEqual({
        code: "NOT_FOUND",
        message: "No contacts found"
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
        .get(`/${v}/contacts`);

      expect(status).toBe(httpCodes.UNAUTHORIZED);
      expect(body).toEqual({
        code: "UNAUTHORIZED",
        message: "Unauthorized request"
      });
    });
  });
});
