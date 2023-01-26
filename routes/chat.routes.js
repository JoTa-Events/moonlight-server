const express = require("express")
const router =express.Router()


const Chat = require("../models/Chat.model")
const User = require("../models/User.model")
const Event = require("../models/Event.model")


const { isAuthenticated } = require("../middleware/jwt.middleware.js");


//create  a chat ==> /chat/:eventId

//only if user in session === author of event
router.post("/chats",(req,res,next)=>{
    const newChat = {
        event: req.body.eventId
    }
    Chat.create(newChat)
        .then(responseChat=>{
            res.json(responseChat)
        })
        .catch(error=>{
            console.log(`something happened creating a chat`,error)
            res.status(500).json(error)
        })
    
})

// get the chat for one event ==> /chats/:eventId
// only if user in session is in participants array from model
router.get("/chats/:eventId",isAuthenticated,(req,res,next)=>{

    
    const eventId = req.params.eventId

    Chat.findOne({ event: eventId })
        .then(responseChat=>{
            console.log(req.payload.username," has access to the chat for event==>",responseChat?.event)
            res.json(responseChat)
        })
        .catch(error=>{
            console.log(`something happened getting the chat`,error)
            res.status(500).json(error)
        })  


})


//post a new comment in a chat
//only if user in session is in participants array from model
router.put("/chats/:eventId",isAuthenticated,(req,res,next)=>{
    
    const {eventId} = req.params
    const newMessage = {
        message : req.body.message,
        author: req.body.userId
      
    }
    // console.log(req.payload.username," can post a comment")
    
    Chat.findOneAndUpdate({event:eventId},{$push: {"messages": newMessage}},{returnDocument:"after"})
        .then(responseChat=>{
            console.log(`a message was created by ${req.payload.username}===>`,responseChat.messages.slice(-1)[0].message)
            res.json(responseChat)
        })
        .catch(error=>{
            console.log(`something happened adding a message to a chat`,error)
            res.status(500).json(error)
        })
})

// delete the chat when the event is deleted
// only if user in session === author of event
router.delete("/chats/:chatId",isAuthenticated,(req,res,next)=>{

    const {chatId} = req.params

        Chat.findByIdAndDelete(chatId)
            .then(responseChat=>{
                console.log("chat successfully deleted",responseChat)
                res.json(responseChat)
            })
            .catch(error=>{
                console.log(`something happened deleting a chat`,error)
                res.status(500).json(error)
            })

})

//delete message in a chat
//only if user in session === author of event
router.put("/chats/:eventId/:commentId",isAuthenticated,(req,res,next)=>{
    
    const {eventId,commentId}=req.params
    res.json({message: "not implemented"})
})

module.exports = router;