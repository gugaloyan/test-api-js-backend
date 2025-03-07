const { check ,body} = require("express-validator");
const { UnprocessableEntity } = require("../../constants/errors");
const validate = require("../../middleware/validation.middleware");

const getAuth = [
  body("email")
    .isEmail()
    .withMessage({
      code: UnprocessableEntity,
      message: "email: parameter must be a valid email address",
    }),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage({
      code: UnprocessableEntity,
      message: "password: parameter must be at least 6 characters long",
    }),
  validate,
];



const createOne = [
  body("full_name").notEmpty().withMessage({
    code: UnprocessableEntity,
    message: "full_name: parameter is required",
  }),
  body("email")
    .isEmail()
    .withMessage({
      code: UnprocessableEntity,
      message: "email: parameter must be a valid email address",
    }),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage({
      code: UnprocessableEntity,
      message: "password: parameter must be at least 6 characters long",
    }),
  validate,
];



module.exports = {getAuth, createOne };


