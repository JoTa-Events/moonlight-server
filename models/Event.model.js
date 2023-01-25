const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    title: {
        type: String,
        required: true
    },
    date: String,
    location: String,
    description: String,
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

const Event = model("Event", eventSchema);

module.exports = Event;
