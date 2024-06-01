const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}


/* **************************************
* Build the car detail view
* ************************************ */
Util.buildInventoryGrid = async function(data, comments){
  let grid
  if(data.length > 0){
    grid = '<div id="inv-detail">'
    data.forEach(vehicle => { 
     
      grid += '<h1>'+ vehicle.inv_year +' '+ vehicle.inv_make +' '+ vehicle.inv_model +'</h1>'
      grid += '<img src="' + vehicle.inv_image
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors">'
      grid += '<h2>'+ vehicle.inv_make +' '+ vehicle.inv_model +' Details</h2>' 
      grid += '<div id="detail-price">'
      grid += '<h3>Price: </h3><span>$'
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '<div id="detail-description">'
      grid += '<h3>Description: </h3>'+ vehicle.inv_description
      grid +='</div>'
      grid += '<div id="detail-color">'
      grid += '<h3>Color: </h3>'+ vehicle.inv_color
      grid +='</div>'
      grid += '<div id="detail-miles">'
      grid += '<h3>Miles: </h3>'+ '<span>'+ new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + '</span>'
      grid +='</div>'
      
      // Add comments section
      grid += '<div id="comments-section">'
      grid += '<h3>Comments:</h3>'
      if (comments.length > 0) {
        comments.forEach(comment => {
          grid += '<p>' + comment.comment + '</p>'
        })
      } else {
        grid += '<p>No comments yet. Be the first to comment!</p>'
      }
      grid += '<form action="/inv/comments" method="POST">'
      grid += '<input type="hidden" name="inv_id" value="' + vehicle.inv_id + '">'
      grid += '<textarea name="comment" required></textarea>'
      grid += '<button type="submit">Submit</button>'
      grid += '</form>'
      grid += '</div>'
      
    })
   grid += '</div>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}





/* **************************************
* Build the ClassificationList
* ************************************ */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" class="classificationList"  id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}













/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)



module.exports = Util