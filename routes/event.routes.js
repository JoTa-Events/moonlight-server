const router = require("express").Router();
const mongoose = require("mongoose");
const Chat =require('../models/Chat.model')
const Event = require('../models/Event.model');
const User = require('../models/User.model');
const { isAuthenticated } =require('../middleware/jwt.middleware')
const fileUploader = require("../config/cloudinary.config");

// POST: creating a new event
router.post("/events",isAuthenticated,(req, res, next) => {
    const {title, date, location, description, participants, author, image} = req.body;

    Event.create({title, date, location, description, participants, author, image})
        .then((responseEvent) => {
            console.log("event created===============>", responseEvent.title)
            return Chat.create({event:responseEvent._id})
        })
        .then(responseChat=>{
            console.log(`This chat has been created`, responseChat._id)
            res.json(responseChat)
        })
        .catch(error => {
            console.log("Error creating new event", error);
            res.status(500).json(error)
        });
})

// POST CLOUDINARY: route that will receive an image, send it to Cloudinary via the fileUploader and return the image URL
router.post("/upload", fileUploader.single("image"), (req, res, next) => {
    console.log("file is: ", req.file);
  
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }
  
    res.json({ fileUrl: req.file.path });
  });

// GET: displaying list of events
router.get("/events", (req, res, next) => {

    Event.find().populate({path:"author",select:"username"})
        .then((allEvents) => {
            res.json(allEvents)
        })
        .catch((error) => res.json(error))
})

// GET: displaying details of a specific event
router.get("/events/:eventId", (req, res, next) => {
    const {eventId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Event.findById(eventId).populate({path:"author",select:"username avatar"})
        .then((event) => res.status(200).json(event))
        .catch((error) => res.json(error));
})

// PUT: updating a specific event by it's id
router.put("/events/:eventId",isAuthenticated, (req, res, next) => {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Event.findOneAndUpdate({ _id: eventId, author: req.payload._id}, req.body, { new: true })
      .then((updatedEvent) => {
        
        if(updatedEvent===null){
            console.log(`${req.payload.username} with id ${req.payload._id} has not the credentials to update this event`)
            res.json({
                message:"only the creator of the event can  update it"
            })
        }else{
            res.json({
              message: `This event with id: ${eventId}, has been updated successfully.`,
            });

        }
       
    })
      .catch(error => {
        console.log("Error updating an event", error);
        res.status(500).json(error)
    });
});

// PUT: updating the array of participants of the event
router.put("/events/:eventId/participants", isAuthenticated, (req, res, next) => {
    const {eventId} = req.params;
    
    const userId = req.body.userId;
    Event.findOneAndUpdate({ _id: eventId }, { $addToSet: { "participants": userId } }, {new:true})
        .then(response => {
            res.json(response)
        })
        .catch(error=>{
            console.log(error)
            res.status(500).json(error)
        })
})

//DELETE: remove the userId from the participants array in an event
router.delete("/events/:eventId/participants", isAuthenticated, (req, res, next) => {
    const {eventId} = req.params;

    const userId = req.payload._id;
    Event.findOneAndUpdate({ _id: eventId }, { $pull: { "participants": userId } }, {new:true})
        .then(response => {
            
            res.json(response)
        })
        .catch(error=>{
            console.log(error)
            res.status(500).json(error)
        })
})

// DELETE: Deleting a specific event by id
router.delete("/events/:eventId",isAuthenticated, (req, res, next) => {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Event.findOneAndDelete({ _id: eventId, author: req.payload._id})
      .then((responseEvent) => {
        
        if(responseEvent===null){

            console.log(`${req.payload.username} with id ${req.payload._id} has not the credentials to delete this event`)

            res.json({
                message:"Only the creator of event can delete it"
            })
            return null
        }
        
        
        return Chat.findOneAndDelete({event:eventId})  
        })
        .then(responseChat=>{
            if(responseChat===null) return 
            
            res.json({
                message: `This event and its chat with id: ${eventId}, have been removed successfully..`,
              });
        })
      .catch((error) => {
        console.log("Error deleting an event", error);
        res.status(500).json(error);
      });
});

module.exports = router;