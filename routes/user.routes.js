const { response } = require("express")
const express = require("express")
const Chat = require("../models/Chat.model")
const Event = require("../models/Event.model")
const User = require("../models/User.model")
const router =express.Router()

router.get("/profile/:username",(req,res,next)=>{
    const {username}=req.params

    User.findOne({"username": username})
        .then(responseUser=>{
           
            if(!responseUser){               
                
                res.status(404).send(`Oops! The user "${username}" doesn't seem to exist in our system. Please check the username and try again.`)
                return
            }
           return Event.find({"author":responseUser._id},{"participants":0}) 
        })
        .then(responseEvent=>{

            //this response does not include the array of participants
            res.json(responseEvent)
        })
        .catch(error=>{
            console.log('an error ocurred while getting the data from ${username}',error)
            
            res.json(error)
        })
})
module.exports=router