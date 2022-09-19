const fastify = require('fastify')({logger:true})
fastify.register(require('@fastify/jwt'), {
  secret: 'supersecret'
})

let payload:any={hellooo:'Helllllllloooooooooo'}
payload={new:'payload'}
fastify.post('/signup', (req:any, reply:any) => {
  // some code
  const token = fastify.jwt.sign({ payload })
  reply.send({ token })
})

// fastify.addHook("onRequest", async (request: { jwtVerify: () => any }, reply: { send: (arg0: unknown) => void }) => {
//     try {
//       await request.jwtVerify()
//     } catch (err) {
//       reply.send(err)
//     }
//   })

fastify.listen(3000, (err: any) => {
  if (err) throw err
})


