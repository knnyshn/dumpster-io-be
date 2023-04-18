export default async function middleAuth(req, res, next) {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({
      message: "sign in you"
    })
  }
  console.log(token)
  const data = jwt.verify(token, TOKEN_KEY)
  req.id = data.id
  next()
}