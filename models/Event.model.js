const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    image: {
      type: String, 
      default: 'https://images.pexels.com/photos/860707/pexels-photo-860707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    title: {
        type: String,
        required: true,
        trim:true
    },
    date: String,
    country: String,
    city: String,
    description:{
      type:String,
      trim:true
    },
    participants: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }

  },
  {
    timestamps: true,
  }
);

module.exports = model("Event", eventSchema);