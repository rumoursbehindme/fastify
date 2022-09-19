import { profile } from "console";
import { userInfo } from "os";
const sget = require('simple-get')

const fastify = require('fastify')({ logger: { level: 'trace' } })
const oauthPlugin = require('@fastify/oauth2')



fastify.register(oauthPlugin, {
    name: 'googleOAuth2',
    scope: ['profile', 'email'],
    credentials: {
      client: {
        id: '987168092680-lg07l12fbancbfov8hrm0anbmh3mg52e.apps.googleusercontent.com',
        secret: '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',
      },
      auth: oauthPlugin.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/',
    callbackUri: 'http://localhost:3000/redirected',
    callbackUriParams: {
      // custom query param that will be passed to callbackUri
     // access_type: 'offline', // will tell Google to send a refreshToken too
    },
    
  });

 

  
  fastify.get('/redirected', async function (request:any, reply:any) {
    const token = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request,(err:any,res:any)=>{
      if(err){
        reply.send(err)
        return 
      }
      
    })
   
    console.log(token.access_token)
  
    // if later you need to refresh the token you can use
    // const newToken = await this.getNewAccessTokenUsingRefreshToken(token.refresh_token)
  
    reply.send({access_token:token.access_token})
 

 
  })


  fastify.listen(3000)