import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'
import fastify from 'fastify'
import formbody from '@fastify/formbody'


const app = fastify({logger:true})

app.register(cookie, {
  secret: "my-secret", // for cookies signature
  parseOptions: {}     // options for parsing cookies
} as FastifyCookieOptions)
app.register(formbody)
const user={
    email:'rajeev@gmail.com',
    password:'123'
}
app.get('/', (request: any, reply: any) => {
if(request.cookies.email==user.email){
    reply.type('text/html').send(`${user.email}  logged in<br><br><a href="/logout">Logout</a>`)
}
else{
    reply.redirect('/login')
}
});

app.get('/login',(req,rep)=>{
    if(req.cookies.email==user.email){
        rep.redirect('/')
    }else{ rep.type('text/html')
    rep.send(loginPage())
}
 
})
function loginPage () {
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
  app.post('/login', (request: any, reply: any) => {
    reply.type('application/x-www-form-urlencoded')

    const {email,password}=request.body
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

            )
app.get('/logout',(req,rep)=>{
    rep.clearCookie('email',{path:'/'})
    rep.redirect('/')
})

app.listen(3000)