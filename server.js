const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;


let myServer = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


//*******socket.io*************/


//create the socket io instance
const {Server} = require("socket.io")
const io = new Server(myServer,{
    cors:{
        origin:'*',
        methods:["GET","POST","PUT"]

    }
})


// socket.io connection
io.on("connection",(socket)=>{

  

  console.log("User connected",socket.id);

  // receive data (eventId)
  socket.on("joinChat",(data)=>{
    
    console.log("======> User with socket.id:",socket.id," join Chat: ",data)
    // create a chatRoom, eventId
    socket.join(data)
    
  })

  //"on" receive data 
  socket.on("serverListens",(data)=>{
    
    console.log(data.author,":",data.message,":",data.eventId,",",data.date)
    //"emit"  send data back to everyone(but the sender) in the chatRoom eventId
    socket.to(data.eventId).emit("clientListens",(data))

     

  })

    socket.on("disconnect",()=>{

    console.log("User Disconnected",socket.id)
  })

})