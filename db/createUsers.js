import bcrypt from 'bcrypt'

const users = [
  {
    "name": "Joseph Valle",
    "email": "josephrvalle@gmail.com",
    "username": "joe",
    "password": "valle"
  },
  {
    "name": "Kenny Shin",
    "email": "knnyshn@gmail.com",
    "username": "kenny",
    "password": "shin"
  },
  {
    "name": "Miguel Arias",
    "email": "argenis803@gmail.com",
    "username": "miguel",
    "password": "arias"
  }
]

const encryptedUsers = []

for (let i = 0; i < users.length; i++) {
  encryptedUsers.push(
    {
      "name": users[i].name,
      "email": users[i].email,
      "username": users[i].username,
      "hash": await bcrypt.hash(users[i].password, 10),
      "avatar": `https://xsgames.co/randomusers/assets/avatars/${Math.round(Math.random()) > 0 ? "male" : "female"}/${Math.round(Math.random() * 78)}.jpg`,
      "favorites": []
    }
  )
}

export default encryptedUsers
