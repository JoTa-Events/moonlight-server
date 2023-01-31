const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    title: {
        type: String,
        required: true,
        trim:true
    },
    date:{
      type: Date,
      required:true
    },
    location: {
      type: {
        type: String, 
        default: "Point"
      },
      coordinates: {
        type: [Number]
      },
      city: String
    },
    description:{
      type:String,
      required:true,
      trim:true
    },
    image: String,
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