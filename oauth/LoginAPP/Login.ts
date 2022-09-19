import Fastify from 'fastify'
import cookie from '@fastify/cookie'
import formbody from "@fastify/formbody"
import fg from 'fastify-guard';
import { REPL_MODE_SLOPPY } from 'repl';

const fastify=Fastify({logger:true})

fastify.register(cookie)
fastify.register(formbody)
fastify.register(fg,{
    errorHandler: (result, req, reply) => {
      return reply.redirect('/login')
    }
  }
)
const user={
email:'rajeev@gmail.com',
password:'123'
}


function validation(req:any,rep:any,done:any){
if(req.cookies.email!=user.email){
    req.query=req.url
    rep.redirect('/login')
}
done()
}

function loginPage() {
    return '<html>' +
      '<head><title>Login</title></head>' +
      '<body>' +
      '<h1>Login</h1>' +
      '<form action="http://localhost:3000/login" method="post">' +
      '<h2>Email</h2>' +
      '<input type="email" name="email">' +
      '<h2>Password</h2>' +
      '<input type="text" name="password">' +
      '<br><br><button type="submit">Login</button>' +
      '</form>' +
      //'<a href="/signup">Signup</a>'+
      '</body>' +
      '</html>'
  }

fastify.route({
    method:'GET',
    url:'/login',
    handler:function(req,rep){
        if(req.cookies.email==user.email){
            rep.redirect('/')
        }
        else{
            rep.type('text/html').send(loginPage())
        }
    }
   
})

fastify.route({
    method:'GET',
    url:'/',
    schema:{
        querystring:{
            return_url:{type:'string'}
        }
    },
    preHandler:validation,
    handler:function(req,rep){
        rep.type('text/html')
      rep.send(`${user.email}  logged in<br><br><a href="/logout">Logout</a>`)
    }
})

fastify.route({
    method:'GET',
    url:'/hi',
  
 preHandler:validation,
   handler:function(req,rep){
rep.type('text/html').send(` Hi , How are you <br><br><a href="/logout">Logout</a>`)
   }
   
})
fastify.route({
    method:'GET',
    url:'/hello',

 preHandler:validation,
   handler:function(req,rep){
rep.type('text/html').send(` This is Hello Page , How are you <br><br><a href="/logout">Logout</a>`)
   }
   
})
fastify.route({
    
        method:'POST',
        url:'/login',
        handler:function(request,reply){
            const {email,password}:any=request.body
            console.log(email)
            console.log(request.cookies.email)
            console.log(JSON.stringify(request.cookies.email))
           
                if(email==="rajeev@gmail.com"&&password==="123"){
        
                    reply.setCookie('email', email, { path: '/' })
                    reply.redirect('/')
                }
                else {
                                reply.redirect(401, '/login')
                            }
                        }
        }
       
    
)
fastify.route({
    method:'GET',
    url:'/logout',
    handler:function(req,rep){ rep.clearCookie('email',{path:'/'})
    rep.clearCookie('route',{path:'/'})
    rep.redirect('/')}
})

fastify.listen(3000)