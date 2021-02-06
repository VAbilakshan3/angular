  const Customer = require ("../models/customer.model")
  exports.create = (req, res) => {

        const customer = new Customer({
                              firstname: req.body.firstname,
                              lastname: req.body.lastname,
                              age: req.body.age,
                              address: req.body.address,
                            });
     
        // Save a Customer in the MongoDB
        customer.save().then(data => {
                        // send uploading message to client
                        res.status(200).json({
                          message: "Upload Successfully a Customer to MongoDB with id = " + data.id,
                          customer: data,
                        });
                    }).catch(err => {
                        res.status(500).json({
                          message: "Fail!",
                          error: err.message
                        });
                    });
    };
   
    exports.findall = (req, res) => {
        Customer.find().select('-__v').then(customerInfos => {
              res.status(200).json({
                message: "Get all Customers' Infos Successfully!",
                numberOfCustomers: customerInfos.length,
                customers: customerInfos
              });
            }).catch(error => {
              // log on console
              console.log(error);
    
              res.status(500).json({
                  message: "Error!",
                  error: error
              });
            });
    };
   
    exports.delete = (req, res) => {
        let customerId = req.params.id
    
        Customer.findByIdAndRemove(customerId).select('-__v -_id')
            .then(customer => {
                if(!customer) {
                  res.status(404).json({
                    message: "Does Not exist a Customer with id = " + customerId,
                    error: "404",
                  });
                }
                res.status(200).json({
                  message: "Delete Successfully a Customer with id = " + customerId,
                  customer: customer,
                });
            }).catch(err => {
                return res.status(500).send({
                  message: "Error -> Can NOT delete a customer with id = " + customerId,
                  error: err.message
                });
            });
    };
    
    exports.update = (req, res) => {
        // Find customer and update it
        Customer.findByIdAndUpdate(
                        req.params.id, 
                          {
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            age: req.body.age
                          }, 
                            {new: true}
                        ).select('-__v')
            .then(customer => {
                if(!customer) {
                    return res.status(404).send({
                        message: "Error -> Can NOT update a customer with id = " + req.params.id,
                        error: "Not Found!"
                    });
                }
    
                res.status(200).json({
                  message: "Update successfully a Customer with id = " + req.params.id,
                  customer: customer,
                });
            }).catch(err => {
                return res.status(500).send({
                  message: "Error -> Can not update a customer with id = " + req.params.id,
                  error: err.message
                });
            });
    };
  