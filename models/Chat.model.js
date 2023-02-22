const { Schema, model } = require("mongoose");

const chatSchema = new Schema(
  {
    messages: [
      {
        message: {
          type: String,
          required: true,
        },
        author: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        date: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = model("Chat", chatSchema);

module.exports = Chat;
