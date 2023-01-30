const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    image: String,
    title: {
        type: String,
        required: true,
        trim:true
    },
    date:{
      type: Date,
      required:true
    },
    location: String,
    description:{
      type:String,
      required:true,
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