import Fastify from "fastify";
const fastify=Fastify({logger:true})

import fetch from 'node-fetch'


const client_id="987168092680-lg07l12fbancbfov8hrm0anbmh3mg52e.apps.googleusercontent.com"
const client_Secret="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"
const redirect_url="http://localhost:3000/redirected"
const scope='https://www.googleapis.com/auth/drive.metadata.readonly'
const statecode1='awkjfglabAwhdd3762rygfwvcb'

fastify.get('/',(req,rep)=>{
  rep.type('text/html').send(`<a href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=${client_id}&redirect_uri=${redirect_url}&response_type=code&scope=${scope}&state=${statecode1}">Login</a>`)
})

fastify.get('/redirected',(req,rep)=>{
  interface ex{
    code:string,
    scope:string,
    state:string,
  }
  const code:ex|any=(req.query)
  console.log(code.code)
  
    async function fetchhh(){

      const fe= await fetch(`https://accounts.google.com/o/oauth2/token?grant_type=authorization_code&code=${code.code}&client_id=${client_id}&client_secret=${client_Secret}&redirect_uri=http://localhost:3000/redirected`,{'method':'POST'})
      interface jss{
       access_token:string,
       expires_in:number
       scope:string
       token_type:string
      } 
      const js:jss=await fe.json()
     
       console.log({access_token:js.access_token})
       const resource=await fetch(`https://www.googleapis.com/drive/v2/files?client_id=${client_id}&client_secret=${client_Secret}&token_type=${js.token_type}&access_token=${js.access_token}`,{'headers':{'content-type':'application/x-www-form-urlencoded'}})
            const lo= await resource.text()
       rep.send(lo)
     }
     if(code.state==statecode1){
     fetchhh()
  }
  else{
    rep.send("State no matching")
  }

}
)
fastify.listen(3000) 
   
