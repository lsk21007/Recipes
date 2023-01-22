const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema({
  email: String,
  password: String,
});

mongoose.model("UserInfo", UserDetailsScehma);
