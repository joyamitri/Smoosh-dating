const pages = {}

// ##################################
//         LOGIN AND SIGNUP
// ##################################

pages.loadFor = (page) => { 
  eval("pages.load_" + page + "();")
}
