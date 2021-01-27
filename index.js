const server = require('fastify')({ logger: true })
const cors = require('cors')
const middie = require('middie')
const admin = require('firebase-admin')

const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://chat-sb-afsdasdasdas-default-rtdb.firebaseio.com',
})

// admin.auth().createUser({
//   email: 'user@example.com',
//   password: 'secretPassword',
//   displayName: 'John Doe',
//   photoURL: 'http://www.example.com/12345678/photo.png',
//   disabled: false,
// })
// admin
//   .auth()
//   .getUserByEmail('user@example.com')
//   .then((data) => console.log(data))

const uid = '12312312312'

// admin
//   .auth()
//   .createCustomToken(uid)
//   .then((customToken) => {
//     console.log(customToken)
//   })

const start = async () => {
  try {
    await server.register(middie)

    await server
    server.use(cors())
    const uid = '1111111111111111111'

    server.route({
      method: 'GET',
      url: '/auth/chat/',
      handler: async (req, reply) => {
        const token = await admin.auth().createCustomToken(uid)

        console.log(token)
        return token
      },
    })

    await server.listen(5000, '0.0.0.0')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
