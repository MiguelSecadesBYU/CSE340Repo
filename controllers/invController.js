const invModel = require("../models/inventory-model")
const commentModel = require("../models/comment-model")
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
  const comments = await commentModel.findByInventoryId(inventory_id) // Obtener comentarios
  const grid = await utilities.buildInventoryGrid(data, comments) // Pasar comentarios al generador de grid
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
    const classificationSelect = await utilities.buildClassificationList()
    res.render("./inventory/management", {
      title: "Management",
      nav,
      classificationSelect,
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


/* ***************************
 *  Build new Inventory view
 * ************************** */
invCont.buildNewInventory = async function (req, res, next) {
  try {
    let nav = await utilities.getNav();
    let classificationList = await utilities.buildClassificationList();
    res.render("./inventory/new-inventory", {
      title: "Add new vehicle",
      nav,
      classificationList,
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
  const { classification_name } = req.body

  const regResult = await invModel.addClassification(classification_name)

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


/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

module.exports = { invCont, addClassification, buildManagement }
