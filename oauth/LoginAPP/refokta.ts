import Fastify, { FastifyRequest } from 'fastify';
import { Issuer,generators } from 'openid-client';
import fetch from  'node-fetch'

const fastify=Fastify({logger:true})

const okta=await Issuer.discover('https://dev-99832846-admin.okta.com')


const client=new okta.Client({
                    client_id : "0oa67hyu6u8gNRy255d7",
     client_secret: "RSogDYzZPKKGnPNZ_lR57Fk4yTeAR5QOV0LDTHax",
   redirect_uris : ["http://localhost:3000/redirected"],
   //grant_types:['refresh_token'],
        response_types: ['code'],
})

const state=generators.state()
const code_verifier= generators.codeVerifier()


fastify.get('/',(req,rep)=>{
                    rep.redirect(client.authorizationUrl({
                                        state,
                                        scope: 'openid offline_access email profile',
                                         resource:'https://dev-99832846.okta.com/oauth2/v1/userinfo',
                                        code_challenge: `${generators.codeChallenge(code_verifier)}`  ,
                                        code_challenge_method: 'S256',          
                    }))
})


fastify.get('/redirected',async(req:any,rep)=>{
                    const params=client.callbackParams(req)
                    const tokenSet = await client.callback('http://localhost:3000/redirected', params,{code_verifier,state});
                    rep.send(tokenSet)
})

fastify.listen({port:3000})