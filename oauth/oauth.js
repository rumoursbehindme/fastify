// const fastify = require('fastify')({ logger: { level: 'trace' } })
// const oauthPlugin = require('@fastify/oauth2')


// fastify.register(oauthPlugin, {
//   name: 'googleOAuth2',
//   scope: ['profile', 'email'],
//   credentials: {
//     client: {
//        id:'987168092680-lg07l12fbancbfov8hrm0anbmh3mg52e.apps.googleusercontent.com' ,               //   id: '803031627296502',
//      secret:'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' //secret: '44df4d2daf4196d1edc53bb3513c76ea'
//     },
//     auth: oauthPlugin.GOOGLE_CONFIGURATION
//   },
//   // register a fastify url to start the redirect flow
//   startRedirectPath: '/',
//   // facebook redirect here after the user login
//   callbackUri: 'http://localhost:3000/redirected',
// //   callbackUriParams: {
// //     // custom query param that will be passed to callbackUri
// //     access_type: 'offline', // will tell Google to send a refreshToken too
// //   },
// })

// fastify.get('/redirected', async function (request, reply) {
//  // const token = await this.googleOauth2.getAccessTokenFromAuthorizationCodeFlow(request)
//   const token =  await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

//     console.log('\n\nstart\n\n')
//   console.log(token.access_token)

//   // if later you need to refresh the token you can use
//   // const newToken = await this.getNewAccessTokenUsingRefreshToken(token.refresh_token)
// reply.send({access_token:token.access_token})
//  // reply.redirect("http://localhost:3002/?token="  + token.access_token)
// })
  


// fastify.listen(3000)


const fastify = require('fastify')({ logger: { level: 'trace' } })

const sget = require('simple-get')
// const oauthPlugin = require('fastify-oauth2')
const oauthPlugin = require('@fastify/oauth2')

fastify.register(oauthPlugin, {
  name: 'googleOAuth2',
  scope: ['profile','email'],
  credentials: {
    client: {
      id: '987168092680-lg07l12fbancbfov8hrm0anbmh3mg52e.apps.googleusercontent.com',
      secret:'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'
    },
    auth: oauthPlugin.GOOGLE_CONFIGURATION
  },
  startRedirectPath: '/',
  callbackUri: 'http://localhost:3000/redirected'
})

fastify.get('/redirected', function (request, reply) {
  fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request, (err, result) => {
    if (err) {
      reply.send(err)
      return
    }

    sget.concat({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + result.access_token
      },
      json: true
    }, function (err, res, data) {
      if (err) {
        reply.send(err)
        return
      }
      reply.send(data)
    })
  })
})
// fastify.get('/logout',(req,rep)=>{
//   req.session=null;
//   rep.redirect('/')
// })
// fastify.get('/external', { /* Hooks can be used here */ }, async (req, reply) => {
//   const authorizationEndpoint = fastify.customOAuth2.generateAuthorizationUri(req);
//   reply.redirect(authorizationEndpoint)
// });
fastify.listen(3000)