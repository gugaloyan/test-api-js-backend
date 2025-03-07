const { check, body } = require("express-validator");
const { UnprocessableEntity } = require("../../constants/errors");
const validate = require("../../middleware/validation.middleware");

const getOne = [
  check("id")
    .isString()
    .withMessage({
      code: UnprocessableEntity,
      message: "id: parameter must be a string",
    }),
  validate,
];


const editOne = [
  check("id").isString().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

const createOne = [
  body("lastname").notEmpty().withMessage({
    code: UnprocessableEntity,
    message: "lastname: parameter is required",
  }),
  body("firstname").notEmpty().withMessage({
    code: UnprocessableEntity,
    message: "firstname: parameter is required",
  }),
  body("email")
    .isEmail()
    .withMessage({
      code: UnprocessableEntity,
      message: "email: parameter must be a valid email address",
    }),
  body("phone")
    .optional()
    .matches(/^\+(\d{1,3})?(\d{10})$/, "i")
    .withMessage({
      code: "UnprocessableEntity",
      message: "phone: parameter must be a valid phone number",
    }),
  validate,
];



const deleteOne = [
  check("id").isString().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

module.exports = { getOne, editOne, createOne, deleteOne };
