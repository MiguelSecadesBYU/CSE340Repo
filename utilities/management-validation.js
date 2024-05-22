const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
 
 
 
 /*  **********************************
  *  Add ne Classification Data Validation Rules
  * ********************************* */
 validate.classificationRules = () => {
    return [
      // firstname is required and must be string
      body("classification_name")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a classification name."), // on error this message is sent.
    ]
  }




  validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inv/add-classification", {
        errors,
        title: "Add new classification",
        nav,
        classification_name,
      })
      return
    }
    next()
  } 










  module.exports = validate