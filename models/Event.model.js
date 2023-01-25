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
    chat: { 
      type: Schema.Types.ObjectId, 
      ref: 'Chat'
    },
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