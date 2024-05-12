/* ***********************************
 *  Account Controller
 *  Unit 4, deliver login view activity
 * ********************************** */
//Needed Resources
const utilities = require("../utilities/")



/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
    })
  }
  
  module.exports = { buildLogin }