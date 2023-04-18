import { token } from "morgan"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import bcrypt from "bcrypt"

export default async function UserUpdateProfile(req, res) {
  const id = req.params.id
  const { username, password, name, email, avatar, favorites } = req.body
  let codedPassword = password ? await bcrypt.hash(password, 5) : false
  let decode = jwt.decode(id)
  let decodeId = decode.id

  const user = await User.findByIdAndUpdate(
    decodeId,
    {
      username: req.body.username || User.findById(decodeId).username,
      hash: codedPassword || User.findById(decodeId).hash,
      name: req.body.name || User.findById(decodeId).name,
      email: req.body.email || User.findById(decodeId).email,
      avatar: req.body.avatar || User.findById(decodeId).avatar,
      favorites: req.body.favorites || User.findById(decodeId).favorites,
    },
    { new: true } // Return the updated document
  )
  await user.save()

  console.log(req.body)
  console.log(user)
  return res.json(user)
}
