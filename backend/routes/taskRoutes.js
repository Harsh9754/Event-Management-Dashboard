const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const Attendee = require('../models/attendee');
const Event = require('../models/event');

router.post('/', async (req, res) => {
    try {
        const {name, deadline, assignedAttendee, event } = req.body;
        console.log(req.body);
        const newTask = new Task({
        name,
        deadline,
        assignedAttendee,
        event
    });
        await newTask.save();

        const attendee = await Attendee.findById(assignedAttendee);
        attendee.assignedTasks.push(newTask);
        await attendee.save();

        const eventData = await Event.findById(event);
        eventData.tasks.push(newTask);
        await eventData.save();

        res.status(201).json({newTask});
    } catch (error) {
       res.status(500).json({error: error.message});
    }
});
// router.get("/", async (req, res)=>{
//     // const res=[]
//     try {
//         const Tasks = await Task.find();
//         // console.log(Tasks)
//         const EventName=[""]
//         const AssTo=[""]
//         const NewTask=[{}]
//         const fetchEventName=async(eventId)=>{
//             const EventDet=await Event.findById(eventId);
//             console.log(EventDet?.name)
//             return EventDet?.name;
//         }
//         const fetchName=async(attendeeId)=>{
//             const AttendeeDet=await Attendee.findById(attendeeId);
//             console.log(typeof(AttendeeDet?.name));
//             return AttendeeDet?.name;
//         }
//         const ResultArr=[{}];
//         for (const task of Tasks) {
//             const eventId=task.event;
//             const attendeeId=task.assignedAttendee;
//             const AttendeeDet=fetchName(attendeeId);
//             const EventDet=fetchEventName(eventId);
//             // task.assignedAttendee = AttendeeDet;
//             // task.event = EventDet ? EventDet : "No Event Found";
//             // console.log(task);
//             const fullDet={
//                 name: task.name,
//                 status: task.status,
//                 assignedAttendee:AttendeeDet?.toString(),
//                 event:EventDet?.toString(),
//             }
//             ResultArr.push(fullDet);
//         }
//         // console.log("Attendee",ResultArr);
//         res.status(200).json(ResultArr);
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
// });
router.get("/", async (req, res) => {
    try {
        const Tasks = await Task.find();
        const fetchEventName = async (eventId) => {
            const EventDet = await Event.findById(eventId);
            return EventDet ? EventDet.name.toString() : "No Event Found";
        };

        const fetchName = async (attendeeId) => {
            const AttendeeDet = await Attendee.findById(attendeeId);
            return AttendeeDet ? AttendeeDet.name.toString() : "Unknown Attendee";
        };
        const UpdatedTasks = await Promise.all(
            Tasks.map(async (task) => {
                const eventId = task.event;
                const attendeeId = task.assignedAttendee;

                const eventName = await fetchEventName(eventId);
                const attendeeName = await fetchName(attendeeId);

                return {
                    name: task.name, // Assuming `task.name` exists
                    assignedAttendee: attendeeName,
                    event: eventName,
                    status: task.status, // Assuming `task.status` exists
                };
            })
        );

        res.status(200).json(UpdatedTasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:eventID', async (req, res) => {
    try {
        const tasks = await Task.find({event: req.params.eventID}).populate('assignedAttendee');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {status} = req.body;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { status }, {new : true});
        if(!updatedTask) return res.status(404).json({message : 'Task not found'});
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});
router.delete('/:id', async (req, res) => {
    try {

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;