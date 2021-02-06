module.exports = function(app) {
 
    var students = require('../controllers/student.controllers');
  
    // Create a new student
    app.post('/api/student/create', students.create);
  
    // Retrieve all student
    app.get('/api/student/retrieveinfos', students.findall);
  
    // Update a student with Id
    app.put('/api/student/updatebyid/:id', students.update);
  
    // Delete a student with Id
    app.delete('/api/student/deletebyid/:id', students.delete);
  }