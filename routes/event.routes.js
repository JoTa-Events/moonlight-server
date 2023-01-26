const router = require("express").Router();
const mongoose = require("mongoose");
const Chat =require('../models/Chat.model')
const Event = require('../models/Event.model');
const User = require('../models/User.model');

// POST: creating a new event
router.post("/events", (req, res, next) => {
    const {title, date, country, city, description, participants, author} = req.body;
    
    Event.create({title, date, country, city, description, participants, author})
        .then((responseEvent) => {
            console.log("event created===============>",responseEvent.title)
            return Chat.create({event:responseEvent._id})  
        })
        .then(responseChat=>{
            console.log(`chat created==================>`,responseChat._id)
            res.json(responseChat)
        })
        .catch(error => {
            console.log("Error creating new event", error);
            res.status(500).json(error)
        });
})

// GET: displaying list of events
router.get("/events", (req, res, next) => {

    Event.find()
        .then((allEvents) => res.json(allEvents))
        .catch((error) => res.json(error))
})

// GET: displaying details of a specific event
router.get("/events/:eventId", (req, res, next) => {
    const {eventId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Event.findById(eventId)
        .then((event) => res.status(200).json(event))
        .catch((error) => res.json(error));
})

// PUT: updating a specific event by it's id
router.put("/events/:eventId", (req, res, next) => {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }
  
    Event.findByIdAndUpdate(eventId, req.body, { new: true })
      .then((updatedEvent) => res.json(updatedEvent))
      .catch(error => {
        console.log("Error updating an event", err);
        res.status(500).json(error)
    });
});
  
// DELETE: Deleting a specific event by it's id
router.delete("/events/:eventId", (req, res, next) => {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }
  
    Event.findByIdAndRemove(eventId)
        .then(() =>
            res.json({
                message: `This event with id: ${eventId}, has been removed successfully.`,
            })
        )
        .catch(error => {
            console.log("Error deleting an event", error);
            res.status(500).json(error)
        });
});

module.exports = router;