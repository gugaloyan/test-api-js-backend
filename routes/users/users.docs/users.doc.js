const { CREATED, UNPROCESSABLE_ENTITY } = require("../../../constants/http-codes");

module.exports = {
  "/users": {
    post: {
      summary: "Create a new user",
      description: "Allows creating a new user with full name, email, and password.",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                full_name: {
                  type: "string",
                  description: "Full name of the user",
                  example: "John Doe",
                },
                email: {
                  type: "string",
                  format: "email",
                  description: "User's email address",
                  example: "john.doe@example.com",
                },
                password: {
                  type: "string",
                  format: "password",
                  minLength: 6,
                  description: "User's password (must be at least 6 characters)",
                  example: "securePass123",
                },
              },
              required: ["full_name", "email", "password"],
            },
          },
        },
      },
      responses: {
        [CREATED]: {
          description: "User successfully created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    description: "User ID",
                    example: "123456789",
                  },
                  full_name: {
                    type: "string",
                    description: "Full name of the user",
                    example: "John Doe",
                  },
                  email: {
                    type: "string",
                    format: "email",
                    description: "User's email",
                    example: "john.doe@example.com",
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    description: "Timestamp of user creation",
                    example: "2025-03-06T12:00:00Z",
                  },
                },
              },
            },
          },
        },
        [UNPROCESSABLE_ENTITY]: {
          description: "Validation error (missing or incorrect parameters)",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "string",
                    description: "Error message",
                    example: "full_name: parameter is required",
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
