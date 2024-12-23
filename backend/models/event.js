const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name:{type: String, required: true},
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendee' }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('Event', EventSchema);