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
    avatar:{
      type:String,
      default:'https://res.cloudinary.com/douen1dwv/image/upload/v1674988751/moonlight-default-img/photo-1674094170431-000e0edbc342_qb8ru0.jpg', 
      trim:true
    } 
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
