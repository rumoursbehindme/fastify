import Fastify from 'fastify'
import cookie from '@fastify/cookie'
import formbody from "@fastify/formbody"
import fp from 'fastify-plugin'
import { doesNotMatch } from 'assert'
import jwt_decode from 'jwt-decode'
import fetch from 'node-fetch'
import { Issuer,generators } from 'openid-client'

const fastify = Fastify({ logger:{level:'error',
transport:{
    target:'pino-pretty'
}

} })

const googleIssuer = await Issuer.discover('https://accounts.google.com');

 const code_verifier = generators.codeVerifier();
console.log(code_verifier)

const code_challenge = generators.codeChallenge(code_verifier);
const nonce= generators.nonce()
const client= new googleIssuer.Client({
    client_id : "987168092680-lg07l12fbancbfov8hrm0anbmh3mg52e.apps.googleusercontent.com",
    client_secret: "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",
  redirect_uris : ["http://localhost:3000/redirected"],
   grant_types:'authorization_code',
   response_types: ['code'],
   });
fastify.register(cookie)
fastify.register(formbody)
const user = {
    email: 'rajeevhegde5@gmail.com',
    password: '123'
}
fastify.register((fastify: any, opt: any, done: any) => {

   
    fastify.addHook('preHandler', (req: any, rep: any, done: any) => {
        if (req.cookies.email != user.email) {
       
            rep.redirect(`/login`)
        }
        done()
    })



    fastify.get('/', (req: any, rep: any) => {

        rep.type('text/html').send(`${user.email}  logged in<br><br><a href="/logout">Logout</a>`)
    })


    fastify.get('/hi', (req: any, rep: any) => {
     
        rep.type('text/html').send(`Hiii Page<br><br><a href="/logout">Logout</a>`)
    })


    fastify.get('/hello', (req: any, rep: any) => {
        
        rep.type('text/html').send(`Hello page<br><br><a href="/logout">Logout</a>`)
    })

    fastify.get('/logout', (req: any, rep: any) => {
      
         
        rep.clearCookie('email', { path: '/' })
        rep.setCookie('url',"/",{Path:"/"})
        rep.redirect('/')
    })

done()

}
)
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
        `<a href="http://localhost:3000/GoogleLogin">GoogleLogin</a>`+
        '</body>' +
        '</html>'
}

fastify.get('/login', (req: any, rep: any) => {
    // console.log(req.query)
    // console.log(req.query.return_url)
    if (req.cookies.email == user.email) {
        rep.redirect('/')
    }
    else {
        rep.type('text/html').send(loginPage())

    }
})

fastify.get('/GoogleLogin',(req:any,rep:any)=>{
    rep.redirect(client.authorizationUrl({
         redirect_uri:'http://localhost:3000/redirected',
      scope: 'openid email profile',
      code_challenge,
      code_challenge_method: 'S256',
    }))
   })

fastify.get('/redirected',async (req:any,rep:any)=>{
    const params = client.callbackParams(req);
    console.log('Hellloooo\n\n\n')
    console.log(params)
const tokenSet = await client.callback('http://localhost:3000/redirected', params,{code_verifier});
// const access_token:any=tokenSet.access_tokenauthorization_code

// console.log(tokenSet.claims())
// console.log('received and validated tokens %j', tokenSet);
//console.log('validated ID Token claims %j', tokenSet.claims());
 rep.setCookie('email',tokenSet.claims().email,{path:'/',maxAge:60*60*24*2})
rep.redirect('/')

})


fastify.post('/login', (request: any, reply: any) => {
    const { email, password }: any = request.body
    // console.log(email)
    // console.log(request.cookies.email)
    // console.log(JSON.stringify(request.cookies.email))

    if (email === "rajeevhegde5@gmail.com" && password === "123") {
    
        reply.setCookie('email', email, { path: '/' })
        reply.redirect('/')
    }
    else {
        throw new Error('Dodd error idu guru')
    }
})



fastify.listen({port:3000})



