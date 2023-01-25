const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    image: {
      type: String, 
      default: 'https://images.pexels.com/photos/860707/pexels-photo-860707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
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