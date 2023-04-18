import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const TOKEN_KEY = process.env.TOKEN_KEY

function getExpiration() {
  const d = new Date()
  d.setMinutes(d.getMinutes() + 30)
  return d.getTime()
}

/***************************************************************/
/****                                                       ****/
/***                 USER                                    ***/
/**                      SIGN                                 **/
/***                         IN                              ***/
/****                                                       ****/
/***************************************************************/

export async function Sign_in(req, res) {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  // If the user does not exist, make them create a new account.
  if (!user) {
    return res.json({
      isUser: true
    })
  }

  // If the user does exist, check the password against the hash.
  const hash = user.hash
  const result = await bcrypt.compare(password, hash)

  // If the correct password was input, create a token and return it.
  if (result) {
    let data = {
      id: user._id,
      exp: getExpiration()
    }
    const token = jwt.sign(data, TOKEN_KEY)
    return res.json({ token: token, avatar: user.avatar })
  }
  // If the incorrect password was input, let the user know.  
  else {
    return res.json({ isPassword: true })
  }
}

/***************************************************************/
/****                                                       ****/
/***                 USER                                    ***/
/**                      SIGN                                 **/
/***                         UP                              ***/
/****                                                       ****/
/***************************************************************/

export async function Signup(req, res) {
  const { username, password } = req.body

  // Check if the username is taken.
  const isUser = await User.findOne({ username })
  if (isUser) {
    return res.json({ usernameExists: true })
  } else {
    const hash = await bcrypt.hash(password, 5)
    const user = await User.create({ username, hash })
    const data = {
      id: user._id,
      exp: getExpiration()
    }
    const token = jwt.sign(data, TOKEN_KEY)
    return res.json(token)
  }
}