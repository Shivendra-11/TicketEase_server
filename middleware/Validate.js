const { body, validationResult } = require("express-validator");

exports.validateTicket = [
  body("name").notEmpty().withMessage("Name is required"),
  body("departure").notEmpty().withMessage("Departure location is required"),
  body("destination").notEmpty().withMessage("Destination is required"),
  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Invalid date format (use YYYY-MM-DD)"),
  body("time")
    .notEmpty()
    .withMessage("Time is required")
    .matches(/^([0-9]{2}):([0-9]{2})$/)
    .withMessage("Invalid time format (use HH:MM)"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),
  body("seat").notEmpty().withMessage("Seat is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
