const { OK, CREATED, UNAUTHORIZED, NOT_FOUND, UNPROCESSABLE_ENTITY } = require("../../../constants/http-codes");

module.exports = {
  "/companies": {
    get: {
      summary: "Get all companies",
      description: "Retrieves a paginated list of companies with optional filtering, sorting, and pagination. Requires authentication.",
      tags: ["Companies"],
      parameters: [
        {
          name: "status",
          in: "query",
          required: false,
          schema: { type: "string" },
          description: "Filter by company status (e.g., 'active', 'inactive')",
        },
        {
          name: "type",
          in: "query",
          required: false,
          schema: { type: "string" },
          description: "Filter by company type (optional)",
        },
        {
          name: "sortBy",
          in: "query",
          required: false,
          schema: { type: "string", enum: ['name', 'status', 'address'] },
          description: "Field to sort by (default is 'name')",
          example: "name",
        },
        {
          name: "sortOrder",
          in: "query",
          required: false,
          schema: { type: "string", enum: ['asc', 'desc'] },
          description: "Sort order (default is 'asc')",
          example: "asc",
        },
        {
          name: "page",
          in: "query",
          required: false,
          schema: { type: "integer", default: 1 },
          description: "Page number (default is 1)",
        },
        {
          name: "limit",
          in: "query",
          required: false,
          schema: { type: "integer", default: 10 },
          description: "Number of companies per page (default is 10)",
        },
      ],
      responses: {
        [OK]: {
          description: "List of companies retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  companies: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string", description: "Company ID", example: "123456789" },
                        name: { type: "string", example: "Company ABC" },
                        shortName: { type: "string", example: "ABC" },
                        businessEntity: { type: "string", example: "LLC" },
                        status: { type: "string", example: "active" },
                        address: { type: "string", example: "123 Main St" },
                      },
                    },
                  },
                  currentPage: { type: "integer", example: 1 },
                  totalPages: { type: "integer", example: 10 },
                  totalCompanies: { type: "integer", example: 100 },
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
      summary: "Create a new company",
      description: "Creates a new company. Requires authentication.",
      tags: ["Companies"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                contactId: { type: "string", example: "605c72ef153207001f11bf7" },
                name: { type: "string", example: "Company ABC" },
                shortName: { type: "string", example: "ABC" },
                businessEntity: { type: "string", example: "LLC" },
                contract: {
                  type: "object",
                  properties: {
                    no: { type: "string", example: "ABC123" },
                    issue_date: { type: "string", format: "date", example: "2021-01-01" },
                  },
                },
                type: {
                  type: "array",
                  items: { type: "string", enum: ["agent", "contractor"] },
                  example: ["contractor"],
                },
                status: { type: "string", enum: ["active", "inactive"], example: "active" },
                photos: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string", example: "company-photo.jpg" },
                      filepath: { type: "string", example: "/path/to/photo.jpg" },
                      thumbpath: { type: "string", example: "/path/to/thumb.jpg" },
                    },
                  },
                },
                address: { type: "string", example: "123 Main St" },
              },
              required: ["contactId", "name"], // "contactId" added as required
            },
          },
        },
      },
      responses: {
        [CREATED]: {
          description: "Company created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string", example: "123456789" },
                  name: { type: "string", example: "Company ABC" },
                  shortName: { type: "string", example: "ABC" },
                  businessEntity: { type: "string", example: "LLC" },
                  contract: {
                    type: "object",
                    properties: {
                      no: { type: "string", example: "ABC123" },
                      issue_date: { type: "string", format: "date", example: "2021-01-01" },
                    },
                  },
                  type: {
                    type: "array",
                    items: { type: "string", enum: ["agent", "contractor"] },
                    example: ["contractor"],
                  },
                  status: { type: "string", example: "active" },
                  photos: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string", example: "company-photo.jpg" },
                        filepath: { type: "string", example: "/path/to/photo.jpg" },
                        thumbpath: { type: "string", example: "/path/to/thumb.jpg" },
                      },
                    },
                  },
                  address: { type: "string", example: "123 Main St" },
                },
              },
            },
          },
        },
        [UNPROCESSABLE_ENTITY]: {
          description: "Validation error",
        },
        [UNAUTHORIZED]: {
          description: "Unauthorized request",
        },
      },
    },
  },
  "/companies/{id}": {
    get: {
      summary: "Get a company by ID",
      description: "Retrieves a single company by ID. Requires authentication.",
      tags: ["Companies"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Company ID",
        },
      ],
      responses: {
        [OK]: {
          description: "Company retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string", example: "123456789" },
                  name: { type: "string", example: "Company ABC" },
                  shortName: { type: "string", example: "ABC" },
                  businessEntity: { type: "string", example: "LLC" },
                  status: { type: "string", example: "active" },
                  address: { type: "string", example: "123 Main St" },
                },
              },
            },
          },
        },
        [NOT_FOUND]: {
          description: "Company not found",
        },
        [UNAUTHORIZED]: {
          description: "Unauthorized request",
        },
      },
    },
    patch: {
      summary: "Edit a company",
      description: "Updates company information by ID. Requires authentication.",
      tags: ["Companies"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Company ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Company ABC" },
                shortName: { type: "string", example: "ABC" },
                businessEntity: { type: "string", example: "LLC" },
                status: { type: "string", example: "active" },
                address: { type: "string", example: "123 Main St" },
              },
            },
          },
        },
      },
      responses: {
        [OK]: {
          description: "Company updated successfully",
        },
        [UNPROCESSABLE_ENTITY]: {
          description: "Validation error",
        },
        [NOT_FOUND]: {
          description: "Company not found",
        },
        [UNAUTHORIZED]: {
          description: "Unauthorized request",
        },
      },
    },
    delete: {
      summary: "Delete a company",
      description: "Deletes a company by ID. Requires authentication.",
      tags: ["Companies"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Company ID",
        },
      ],
      responses: {
        [OK]: {
          description: "Company deleted successfully",
        },
        [NOT_FOUND]: {
          description: "Company not found",
        },
        [UNAUTHORIZED]: {
          description: "Unauthorized request",
        },
      },
    },
  },
  "/companies/{id}/image": {
    post: {
      summary: "Add image to a company",
      description: "Uploads an image for a company. Requires authentication.",
      tags: ["Companies"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Company ID",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                file: {
                  type: "string",
                  format: "binary",
                  description: "Image file to upload",
                },
              },
            },
          },
        },
      },
      responses: {
        [OK]: {
          description: "Image uploaded successfully",
        },
        [UNPROCESSABLE_ENTITY]: {
          description: "File validation error",
        },
        [UNAUTHORIZED]: {
          description: "Unauthorized request",
        },
      },
    },
    delete: {
      summary: "Remove image from a company",
      description: "Deletes an image from a company. Requires authentication.",
      tags: ["Companies"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "Company ID",
        },
        {
          name: "image_name",
          in: "query",
          required: true,
          schema: { type: "string" },
          description: "Name of the image to remove",
        },
      ],
      responses: {
        [OK]: {
          description: "Image removed successfully",
        },
        [UNAUTHORIZED]: {
          description: "Unauthorized request",
        },
      },
    },
  },
};
