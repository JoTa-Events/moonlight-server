const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    title: {
        type: String,
        required: true,
        trim:true
    },
    date: String,
    location: String,
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