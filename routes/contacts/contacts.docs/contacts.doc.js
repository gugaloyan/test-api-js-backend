const { OK, CREATED, UNAUTHORIZED, NOT_FOUND, UNPROCESSABLE_ENTITY } = require("../../../constants/http-codes");

module.exports = {
  "/contacts": {
    get: {
      summary: "Get all contacts",
      description: "Retrieves a list of all contacts. Requires authentication.",
      tags: ["Contacts"],
      responses: {
        [OK]: {
          description: "List of contacts retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string", description: "Contact ID", example: "123456789" },
                    lastname: { type: "string", example: "Doe" },
                    firstname: { type: "string", example: "John" },
                    patronymic: { type: "string", example: "Michael" },
                    phone: { type: "string", example: "+1234567890" },
                    email: { type: "string", example: "john.doe@example.com" },
                  },
                },
              },
            },
          },
        },
        [UNAUTHORIZED]: {
          description: "Unauthorized request",
        },
      },
    },
    post: {
      summary: "Create a new contact",
      description: "Creates a new contact. Requires authentication.",
      tags: ["Contacts"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                lastname: { type: "string", example: "Doe" },
                firstname: { type: "string", example: "John" },
                patronymic: { type: "string", example: "Michael" },
                phone: { type: "string", example: "+1234567890" },
                email: { type: "string", example: "john.doe@example.com" },
              },
              required: ["lastname", "firstname", "phone", "email"],
            },
          },
        },
      },
      responses: {
        [CREATED]: {
          description: "Contact created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string", example: "123456789" },
                  lastname: { type: "string", example: "Doe" },
                  firstname: { type: "string", example: "John" },
                  patronymic: { type: "string", example: "Michael" },
                  phone: { type: "string", example: "+1234567890" },
                  email: { type: "string", example: "john.doe@example.com" },
                },
              },
            },
          },
        },
        [UNPROCESSABLE_ENTITY]: {
          description: "Validation error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string", example: "email: parameter must be a valid email address" },
                },
              },
            },
          },
        },
        [UNAUTHORIZED]: {
          description: "Unauthorized request",
        },
      },
    },
  },
  "/contacts/{id}": {
    get: {
      summary: "Get a contact by ID",
      description: "Retrieves a single contact by ID. Requires authentication.",
      tags: ["Contacts"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Contact ID",
        },
      ],
      responses: {
        [OK]: {
          description: "Contact retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string", example: "123456789" },
                  lastname: { type: "string", example: "Doe" },
                  firstname: { type: "string", example: "John" },
                  patronymic: { type: "string", example: "Michael" },
                  phone: { type: "string", example: "+1234567890" },
                  email: { type: "string", example: "john.doe@example.com" },
                },
              },
            },
          },
        },
        [NOT_FOUND]: {
          description: "Contact not found",
        },
        [UNAUTHORIZED]: {
          description: "Unauthorized request",
        },
      },
    },
    patch: {
      summary: "Edit a contact",
      description: "Updates contact information by ID. Requires authentication.",
      tags: ["Contacts"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Contact ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                lastname: { type: "string", example: "Doe" },
                firstname: { type: "string", example: "John" },
                patronymic: { type: "string", example: "Michael" },
                phone: { type: "string", example: "+1234567890" },
                email: { type: "string", example: "john.doe@example.com" },
              },
              required: ["lastname", "firstname", "phone", "email"],
            },
          },
        },
      },
      responses: {
        [OK]: {
          description: "Contact updated successfully",
        },
        [UNPROCESSABLE_ENTITY]: {
          description: "Validation error",
        },
        [NOT_FOUND]: {
          description: "Contact not found",
        },
        [UNAUTHORIZED]: {
          description: "Unauthorized request",
        },
      },
    },
    delete: {
      summary: "Delete a contact",
      description: "Deletes a contact by ID. Requires authentication.",
      tags: ["Contacts"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Contact ID",
        },
      ],
      responses: {
        [OK]: {
          description: "Contact deleted successfully",
        },
        [NOT_FOUND]: {
          description: "Contact not found",
        },
        [UNAUTHORIZED]: {
          description: "Unauthorized request",
        },
      },
    },
  },
};
