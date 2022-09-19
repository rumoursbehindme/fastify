import Fasify from 'fastify'
import { Issuer, TokenSet } from 'openid-client';
import fetch from 'node-fetch';

import { generators } from 'openid-client';
import formbody from '@fastify/formbody'

const okta = await Issuer.discover('https://dev-99832846-admin.okta.com');
console.log('Discovered issuer ', okta.issuer, okta.metadata);//

const fastify=Fasify({logger:true})
fastify.register(formbody)
import  fastifycookie from '@fastify/cookie'
fastify.register(fastifycookie)
const client = new okta.Client({
     client_id : "0oa67hyu6u8gNRy255d7",
     client_secret: "RSogDYzZPKKGnPNZ_lR57Fk4yTeAR5QOV0LDTHax",
   redirect_uris : ["http://localhost:3000/redirected"],
   //grant_types:['refresh_token'],
        response_types: ['code'],
      
      
    // id_token_signed_response_alg (default "RS256")
    // token_endpoint_auth_method (default "client_secret_basic")
  });

const code_verifier = generators.codeVerifier();
console.log(code_verifier)
// store the code_verifier in your framework's session mechanism, if it is a cookie based solution
// it should be httpOnly (not readable by javascript) and encrypted.



const code_challenge = generators.codeChallenge(code_verifier);
const nonce= generators.nonce()
console.log(nonce)
console.log(code_challenge);
const state=generators.state()

fastify.get('/',(req:any,rep:any)=>{
  rep.redirect(client.authorizationUrl({
   state,
  scope: 'openid offline_access email profile',
   resource:'https://dev-99832846.okta.com/oauth2/v1/userinfo',
  code_challenge,
  

  code_challenge_method: 'S256',
}))
})
fastify.get('/redirected',async (req:any,rep:any)=>
{

// rep.redirect(client.authorizationUrl)
    const params = client.callbackParams(req);
    console.log('Hellloooo\n\n\n')
    console.log(params)
const tokenSet = await client.callback('http://localhost:3000/redirected', params,{code_verifier,state});


console.log('received and validated tokens %j', tokenSet);
console.log('validated ID Token claims %j', tokenSet.claims());
rep.setCookie('access_token',tokenSet.access_token,{maxAge:15}).setCookie('refresh',tokenSet.refresh_token,{path:'/',maxAge:60*60*24*2})

rep.send(tokenSet)

}

 )

 fastify.get('/ref',async (req:any,rep:any)=>{
  const ref=await client.refresh(req.cookies.refresh)
  rep.setCookie('access_token',ref.access_token,{maxAge:30}).setCookie('refresh',ref.refresh_token,{path:'/',maxAge:60*60*24*2})
  rep.send(ref)
 })

 fastify.get('/res',async(req:any,rep:any)=>{
 const res=  await client.requestResource('https://dev-99832846-admin.okta.com/admin/users',req.cookies.access_token)
rep.send(res)
 })
 
 fastify.get('/logout',(req,rep)=>{
  rep.clearCookie('access_token',{path:'/'}).clearCookie('refresh',{path:'/'})
  rep.redirect('/loggedout')
 })

 fastify.get('/loggedout',(req,rep)=>{
  rep.send("logged out")
 })




fastify.listen(3000)