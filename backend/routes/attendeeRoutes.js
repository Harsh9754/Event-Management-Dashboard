const express = require('express');
const router = express.Router();
const Attendee = require('../models/attendee');

router.post('/',async (req, res) => {
    try {
        const {name, email, phone} = req.body;
        const newAttendee = new Attendee({name, email, phone});
        await newAttendee.save();
        res.status(201).json(newAttendee);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/', async (req,res) => {
    try {
        const attendees = await Attendee.find().populate('assignedTasks')
        console.log(attendees);
        res.status(200).json(attendees);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/:id', async (req,res) => {
    try {
        const attendee = await Attendee.findById(req.params.id).populate('assignedTasks');
        if(!attendee) return res.status(404).json({message:"attendee not found"});
        res.status(200).json(attendee);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const attendee = await Attendee.findByIdAndDelete(req.params.id);
        if(!attendee) return res.status(404).json({message :"attendee not exist"});
        res.status(200).json({message:"Attendee deleted successfully"})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;