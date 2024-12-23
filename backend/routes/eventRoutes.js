
const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const Task = require('../models/task');
const Attendee = require('../models/attendee');

router.post('/', async (req, res) => {
    try {
        const {name,description,location,date,attendees,tasks} = req.body;
        if (!name || !description || !location || !date) {
            return res.status(400).json({ message: 'All fields are required' });
          }
      
        const newEvent = new Event({
            name,
            description,
            location,
            date,
            attendees,
            tasks
        });
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res)=> {
    try {
        const events = await Event.find().populate('attendees tasks');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const  events = await Event.findByID(req.params.id).populate('attendees tasks');
        if(!events) return res.status(404).json({message: "event not found"});
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, description, location, date, attendees, tasks } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
          name,
          description,
          location,
          date,
          attendees,
          tasks
        }, { new: true });
        if(!updatedEvent) return res.status(500).json({message: "Event not found"});
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if(!event) return res.status(500).json({message:"Event not exist"});
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});



module.exports = router;