const { CREATED, UNPROCESSABLE_ENTITY } = require("../../../constants/http-codes");

module.exports = {
  "/dump": {
    get: {
      summary: "Generate a database dump",
      description: "Generates a dump of the database containing several records of companies and contacts.",
      tags: ["Dump"],
      responses: {
        [CREATED]: {
          description: "Database dump successfully created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "Success message",
                    example: "Database dump created successfully.",
                  },
                  dump: {
                    type: "string",
                    description: "Base64 encoded dump file",
                    example: "aGVsbG8gdGhpcyBpcyBhIGR1bXAgY29udGVudCBmb3IgdGVzdCBkYXRhLg==",
                  },
                },
              },
            },
          },
        },
        [UNPROCESSABLE_ENTITY]: {
          description: "Failed to generate database dump",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                    example: "Failed to generate dump due to database connection error.",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
