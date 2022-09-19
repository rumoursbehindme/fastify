import Fastify, { FastifyInstance, RequestBodyDefault } from "fastify";
import fetch from "node-fetch";
import {Issuer,generators, RequestObjectPayload} from 'openid-client';
import markoplugin from '@marko/fastify';
 import  logintemp from './markos/markojs/loginpage.js';
 import hometemp from "./markos/markojs/home.js";
 import hellotemp from "./markos/markojs/hello.js"
 import myapplogin from "./markos/markojs/myapploginpage.js"
import formbody from '@fastify/formbody'
const fastify=Fastify({logger:true});
import jwt_decode from 'jwt-decode'
import cookie from "@fastify/cookie"
import { stringLiteral } from "@marko/compiler/babel-types.js";

const user ={
  email: 'rajeevhegde5@gmail.com',
  password: '123'
}

const users=[{
  email: 'rajeevhegde5@gmail.com',
  password: '123'
},{
  email: 'rajeev.hegde@gmail.com',
  password: '1234'
}]
fastify.get('/any',(req,rep)=>{
  const email="rajeev.hegde@gmail.com";
  const userdetails=users.find((ud:{email:string})=>ud.email===email)
 rep.send(userdetails?.password)
})

const client_id:string="987168092680-lg07l12fbancbfov8hrm0anbmh3mg52e.apps.googleusercontent.com";
const client_secret="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";
const redirect_uri="http://localhost:3000/redirected";
const state=generators.state();
const nonce=generators.nonce();
const code_verifier=generators.codeVerifier();
const code_challenge=generators.codeChallenge(code_verifier)

fastify.register(markoplugin)
fastify.register(cookie)
fastify.register(formbody)


fastify.register((fastify:FastifyInstance,opt:any,done:any)=>{
  fastify.addHook('preHandler',async(req,rep,done)=>{
   const return_url=`${req.url}`
    rep.setCookie('url',req.url,{path:'/'})
    if(user.email!=req.cookies.email){
      rep.redirect(`/login?return_url=${return_url}`)
    }
    done()
  })

  fastify.get('/',async(req,rep)=>{
    rep.marko(hometemp,{email:req.cookies.email})
  })
  
  fastify.get('/hello',async(req,rep)=>{
    rep.marko(hellotemp,{title:"Yo! This is Hello Page..",name:"Rajeev"})
  })

 
  done()
 
})

fastify.post('/myapp',async(req,rep)=>{
  interface qs{
    return_url:string;
  }
const qs:qs|any=req.query
const {email,password}:any=req.body
if(qs.return_url==="undefined"){
  if(email===user.email&&password===user.password){
    rep.setCookie('email',email,{path:"/"})
  rep.redirect('/')
  }
}
else if(email===user.email&&password===user.password){
  rep.setCookie('email',email,{path:"/"})
  rep.redirect(`${qs.return_url}`)
}
else{
  throw new Error("Error Bantu guru");
  
}

})

fastify.get("/myapp",async(req,rep)=>{
  interface qs{
    return_url:string;
  }
const qs:qs|any=req.query

  if(user.email!=req.cookies.email){
    rep.marko(myapplogin,{return_url:`${qs.return_url}`})
  }else{
    rep.redirect(`${qs.return_url}`)
  }
})

fastify.get('/login',async(req,rep)=>{
  interface qs{
    return_url:string;
  }
const qs:qs|any=req.query

  if(!req.cookies.url){

    rep.setCookie('url','/',{path:"/"});
    rep.setCookie('state',state,{path:"/"});
    rep.setCookie('nonce',nonce,{path:"/"});
  
    if(user.email!=req.cookies.email){
  

   rep.marko(logintemp,{return_url:`/`,client_id:client_id,client_secret:client_secret,redirect_uri:redirect_uri,state:state,nonce:nonce,code_challenge:code_challenge})
    }else{
    
    rep.redirect(`/redirected`)
    }
  }
  else{
    rep.setCookie('state',state,{path:"/"});
    rep.setCookie('nonce',nonce,{path:"/"});
  
    if(user.email!=req.cookies.email){
    
  rep.marko(logintemp,{return_url:`${qs.return_url}`,client_id:client_id,client_secret:client_secret,redirect_uri:redirect_uri,state:state,nonce:nonce,code_challenge:code_challenge})
    }else{
    
    rep.redirect(`/`)
    }
  }
 
});

              
              

fastify.get('/redirected',async(req,rep)=>{
 
                    interface ex {
                                        code: string,
                                        scope: string,
                                        authuser: string,
                                        state: string,
                                        prompt: string,
                                        return_url:string;
                                      }
                                      const code: ex | any = (req.query)

                                      if(req.cookies.state===code.state){
            const fetchh=await fetch(`https://accounts.google.com/o/oauth2/token?grant_type=authorization_code&code=${code.code}&code_verifier=${code_verifier}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=http://localhost:3000/redirected`, { 'method': 'POST',  })
            interface tokenset {
                    access_token: string,
                    expires_in: number,
                    scope: string,
                    token_type: string,
                    id_token: string,
                    refresh_token: string
                  }
            const tokenset:tokenset=await fetchh.json()
            interface id_token{
          iss: string,
          azp: string,
          aud: string,
          sub: string,
          name: string,
          email: string,
          emaial_verified: boolean,
          at_hash: string,
          nonce: string,
          iat: number,
          exp: number
            }
            const id_token:id_token=await jwt_decode(tokenset.id_token)
            if(req.cookies.nonce===id_token.nonce){
            rep.setCookie('email',id_token.email,{path:"/"})
            rep.redirect(`${req.cookies.url}`)
          }
        }
})
fastify.get("/logout",async(req,rep)=>{
  if(user.email===req.cookies.email){
    const returnurl="/"
    rep.setCookie('url','/',{path:'/'})
  rep.clearCookie('state').clearCookie('state').clearCookie('email')
  rep.redirect(`/login?return_url=${returnurl}`)
  }

  else{
    const returnurl="/"
    
    rep.redirect(`/login?return_url=${returnurl}`)
  }
})

fastify.listen({port:3000});