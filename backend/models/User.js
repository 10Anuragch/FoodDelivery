
// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const UserSchema = new Schema({
//   name: { type: String, required: true },
//   location: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });

// const User = mongoose.model("User", UserSchema);
// export default User;

import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false }, // Email verification status
  otp: { type: Number },                          // OTP code
  otpExpires: { type: Date },                     // OTP expiration time
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);
export default User;
