// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const commentController = require("../controllers/commentController")
const utilities = require("../utilities")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build inventory by Detail view
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));

// Route to build management view
router.get("/", utilities.handleErrors(invController.buildManagement));

// Route to build add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Route to build new inventory view
router.get("/new-inventory", utilities.handleErrors(invController.buildNewInventory));

// Route to get inventory by classification ID as JSON
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));

// Routes for comments
router.post("/comments", utilities.handleErrors(commentController.createComment));
router.get("/comments/:inv_id", utilities.handleErrors(commentController.getCommentsByInventoryId));

module.exports = router;
