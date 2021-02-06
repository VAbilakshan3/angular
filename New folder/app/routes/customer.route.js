module.exports = function(app) {
 
    var customers = require('../controllers/customer.controllers');
  
    // Create a new Customer
    app.post('/api/customer/create', customers.create);
  
    // Retrieve all Customer
    app.get('/api/customer/retrieveinfos', customers.findall);
  
    // Update a Customer with Id
    app.put('/api/customer/updatebyid/:id', customers.update);
  
    // Delete a Customer with Id
    app.delete('/api/customer/deletebyid/:id', customers.delete);
  }