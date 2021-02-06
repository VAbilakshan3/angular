const mongoose = require('mongoose');
 
const StudentSchema = mongoose.Schema({
    firstname:  { 
      type: String, 
      required: true 
    },
    subjects:  { 
      type: [String], 
      required: true 
    },
    address:  { 
      type: String, 
      required: true 
    },
    joinedDate: { 
      type: Date, 
      required: true 
    },
});

module.exports = mongoose.model('Student', StudentSchema);