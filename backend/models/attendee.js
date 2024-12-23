const mongoose = require('mongoose');

const AttendeeSchema = mongoose.Schema({
    name:{type: String, required: true},
    email:{type:String, required: true},
    phone:{
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
    },
    assignedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('Attendee', AttendeeSchema);