import Fastify from "fastify";
const fastify = Fastify({logger:true})
import fastifycookie from '@fastify/cookie'
import fastifysession from '@fastify/session'
import formbody from '@fastify/formbody'
import { req } from "pino-std-serializers";

const client_id="987168092680-lg07l12fbancbfov8hrm0anbmh3mg52e.apps.googleusercontent.com"
const client_Secret="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"
const redirect_url="http://localhost:3000/redirected"

const scope='https://www.googleapis.com/auth/drive.metadata.readonly'


function plugin(fastify:any,options:any,next:any){
    fastify.register(fastifycookie)
    
    fastify.register(formbody)
     fastify.register(fastifysession,{
            cookieName: 'sessionId',
            secret: 'afhoir3yr48vt49tvn43vr9vtv3cruwrowi4ug874h',
            cookie: { secure: false },
            expires: 1800000
        })

    fastify.get('/',(req:any,rep:any)=>{
       rep.type('text/html').send(`<h1>Hello Please sign in</h1><a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&scope=openid%20email profile&response_type=code&redirect_uri=${redirect_url}">Login</a>`)
    })

    fastify.get('/redirected',(req:any,rep:any)=>{
       
         req.session.authenticated=true
    interface ex{
        code: string,
        scope: string,
        authuser: string,
        state:string,
        prompt: string
      }
    const code:ex|any=(req.query)
    console.log(code)
    const coookkks=JSON.stringify(req.cookie)
    console.log(coookkks)
    rep.type('text/html').send(`<h1>User Logged in ..</h1>><p1>hiiiii</p1><a href="/logout">Logout</a>`)
    })

    fastify.get('/logout',(request:any,reply:any)=>{
     if(request.session.authenticated){    request.session.destroy((err: any) => {
        if (err) {

            reply.status(500)
            reply.send('Internal Server Error')
        } else {
           // reply.clearCookie('email', { path: '/' })
            reply.redirect('/')
        }
})}
 
}
    )
next()
}

module.exports=plugin