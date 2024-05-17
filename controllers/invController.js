const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}


/* ***************************
 *  Build inventory by Detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inventory_id = req.params.inventoryId
  const data = await invModel.getInventoryByInventoryId(inventory_id) // Aquí es donde se hizo el cambio
  const grid = await utilities.buildInventoryGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].inv_model
  res.render("./inventory/details", {
    title: className + " vehicles",
    nav,
    grid,
  })
}




/* ***************************
 *  Build management view
 * ************************** */
const buildManagement = async function (req, res, next) {
  try {
    let nav = await utilities.getNav();
    res.render("./inventory/management", {
      title: "Management",
      nav,
    });
  } catch (error) {
    next(error);
  }
};



/* ***************************
 *  Build add Classification view
 * ************************** */
invCont.buildAddClassification = async function (req, res, next) {
  try {
    let nav = await utilities.getNav();
    res.render("./inventory/add-classification", {
      title: "Add new classification",
      nav,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
};




/* ****************************************
*  Process Add New Classification
* *************************************** */
async function addClassification(req, res) {
  let nav = await utilities.getNav()
  const { classification_name
  } = req.body

  const regResult = await invModel.addClassification(
    classification_name
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, ${classification_name} was added succesfuly.`
    )
    res.status(201).render("inv/management", {
      title: "Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, something failed.")
    res.status(501).render("inv/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
    })
  }
}












module.exports = {invCont, addClassification, buildManagement }


