const { OK, UNAUTHORIZED } = require("../../../constants/http-codes");

module.exports = {
  "/users/auth": {
    post: {
      summary: "User Authentication",
      description: "Allows authentication via email and password, returns a JWT token",
      tags: ["Auth"],
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  description: "User's email",
                  example: "john.doe@example.com",
                },
                password: {
                  type: "string",
                  description: "User's password",
                  example: "securePass123",
                },
              },
            },
          },
        },
      },
      responses: {
        [OK]: {
          description: "Successful authentication",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  token: {
                    type: "string",
                    description: "JWT token",
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  },
                  user: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                        description: "User ID",
                        example: "123456789",
                      },
                      full_name: {
                        type: "string",
                        description: "Full name",
                        example: "Rick Grimes",
                      },
                      email: {
                        type: "string",
                        description: "Email",
                        example: "rick.grimes@example.com",
                      },
                    },
                  },
                },
              },
            },
          },
        },
        [UNAUTHORIZED]: {
          description: "Invalid credentials",
        },
      },
    },
  },
};
