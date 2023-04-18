import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: {
    type: String,
    unique: true,
    lowercase: true,
  },
  hash: String,
  avatar: String,
  favorites: []
})

export default mongoose.model('User', userSchema)
