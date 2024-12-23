const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    assignedAttendee: { type: mongoose.Schema.Types.ObjectId, ref: 'Attendee' },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});

module.exports = mongoose.model('Task',TaskSchema);