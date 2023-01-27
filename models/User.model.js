const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    username: {
      type: String,
      unique:true,
      lowecase:true,
      trim:true,
      required: [true, "username is required."],
    },
    avatar: String
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
