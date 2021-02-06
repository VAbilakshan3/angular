  const Student = require ("../models/student.model")
  exports.create = (req, res) => {

        const student = new Student({
                              firstname: req.body.firstname,
                              subjects: req.body.subjects,
                              joinedDate: req.body.joinedDate,
                              address: req.body.address,
                            });
     
        // Save a Student in the MongoDB
        student.save().then(data => {
                        // send uploading message to client
                        res.status(200).json({
                          message: "Upload Successfully a Student to MongoDB with id = " + data.id,
                          student: data,
                        });
                    }).catch(err => {
                        res.status(500).json({
                          message: "Fail!",
                          error: err.message
                        });
                    });
    };
   
    exports.findall = (req, res) => {
      Student.find().select('-__v').then(studentInfos => {
              res.status(200).json({
                message: "Get all Student' Infos Successfully!",
                numberOfStudents: studentInfos.length,
                students: studentInfos
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
        let studentId = req.params.id
    
        Student.findByIdAndRemove(studentId).select('-__v -_id')
            .then(student => {
                if(!student) {
                  res.status(404).json({
                    message: "Does Not exist a Student with id = " + studentId,
                    error: "404",
                  });
                }
                res.status(200).json({
                  message: "Delete Successfully a Student with id = " + studentId,
                  student: student,
                });
            }).catch(err => {
                return res.status(500).send({
                  message: "Error -> Can NOT delete a student with id = " + studentId,
                  error: err.message
                });
            });
    };
    
    exports.update = (req, res) => {
        // Find student and update it
        Student.findByIdAndUpdate(
                        req.params.id, 
                          {
                            firstname: req.body.firstname,
                            subjects: req.body.subjects,
                            joinedDate: req.body.joinedDate
                          }, 
                            {new: true}
                        ).select('-__v')
            .then(student => {
                if(!student) {
                    return res.status(404).send({
                        message: "Error -> Can NOT update a student with id = " + req.params.id,
                        error: "Not Found!"
                    });
                }
    
                res.status(200).json({
                  message: "Update successfully a Student with id = " + req.params.id,
                  student: student,
                });
            }).catch(err => {
                return res.status(500).send({
                  message: "Error -> Can not update a student with id = " + req.params.id,
                  error: err.message
                });
            });
    };
  