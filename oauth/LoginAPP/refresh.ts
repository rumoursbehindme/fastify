import Fastify from "fastify";
import cookie from '@fastify/cookie'
import jwt_decode from 'jwt-decode'
import fetch from "node-fetch";
import randomstring from "randomstring";
import crypto from "crypto";
import base64url from "base64url";

const fastify=Fastify({logger:true})

const code_verifier1 = randomstring.generate(128);

const base64Digest = crypto
                    .createHash("sha256")
                    .update(code_verifier1)
                    .digest("base64");


const code_challenge = base64url.fromBase64(base64Digest);


const client_id = "987168092680-lg07l12fbancbfov8hrm0anbmh3mg52e.apps.googleusercontent.com"
const client_Secret = "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"
const redirect_url = "http://localhost:3000/redirected"
const scope = 'https://www.googleapis.com/auth/drive.metadata.readonly'

fastify.register(cookie)

fastify.get('/', (req: any, rep: any) => {
                    const nonce = `${randomstring.generate(45)}`
                    const statecode = `${randomstring.generate(45)}`
                    rep.setCookie('statecode', statecode, { path: '/redirected', httpOnly: true }).setCookie('nonce', nonce, { path: '/redirected', httpOnly: true })
                    console.log(code_challenge); // -
                    rep.type('text/html').send(`<h1>Helllllooooooooo</h1><a href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&include_granted_scopes=true&client_id=${client_id}&scope=openid%20email profile&response_type=code&redirect_uri=${redirect_url}&nonce=${nonce}&state=${statecode}&code_challenge=${code_challenge}&code_challenge_method=S256">Login</a>`)
                   
})

fastify.get('/redirected', (req: any, rep: any) => {
                    interface ex {
                      code: string,
                      scope: string,
                      authuser: string,
                      state: string,
                      prompt: string
                    }
                    const code: ex | any = (req.query)
                
                
                    if (code.state == req.cookies.statecode) {
                      async function fetchhh() {
                
                        const fe = await fetch(`https://accounts.google.com/o/oauth2/token?grant_type=authorization_code&code=${code.code}&code_verifier=${code_verifier1}&client_id=${client_id}&client_secret=${client_Secret}&redirect_uri=http://localhost:3000/redirected`, { 'method': 'POST', 'headers': { 'Content-Type': 'application/x-www-form-urlencoded' } })
                        console.log(req.body)
                        interface jss {
                          access_token: string,
                          expires_in: number,
                          scope: string,
                          token_type: string,
                          id_token: string,
                          refresh_token: string
                        }
                        const js: jss = await fe.json()
                        console.log(js)
                        interface dec {
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
                        rep.setCookie('access_token', js.access_token, { path: '/' }).setCookie('id_token', js.id_token, { path: '/' }).setCookie('refresh', js.refresh_token)
                        const decoded: dec = await jwt_decode(js.id_token)
                
                        console.log(`\n\n${JSON.stringify(decoded)}\n\n`)
                
                        //  const clo= await fetch(`https://accounts.google.com/cloud-platform/v2/files?access_token=${js.access_token}&token_type=${js.token_type}&client_id=${client_id}&client_secret=${client_Secret}`,{'headers':{'content-type':'application/x-www-form-urlencoded'}})
                        //  const clou=await clo.
                        //  rep.send(clou)
                
                        if (decoded.nonce == req.cookies.nonce) {
                
                          rep.type('text/html').send(`<h1>User ${decoded.email.toLocaleUpperCase()} is logged in \n\n Refresh token is ${js.refresh_token}</h1><a href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=${client_id}&redirect_uri=http://localhost:3000/resource&response_type=code&scope=${scope}">access for google drive</a><br></br><form action="/logout"><button type="submit">Logout</button></form>`)
                
                        }
                        else {
                
                          rep.send("You are un authorized ")
                        }
                      }
                      fetchhh()
                    }
                    else {
                      rep.clearCookie('statecode', { path: '/redirected' }).send('state is not matching')
                    }
                  }
                
                  )

                  fastify.get('/ref',(req:any,rep:any)=>{
                 async function fetchu(){
                    const fe=await fetch(`https://accounts.google.com/o/oauth2/token?grant_type=refresh_token&refresh_token=${req.cookie.refresh}&client_id=${client_id}&client_secret=${client_Secret}`, { 'method': 'POST', 'headers': { 'Content-Type': 'application/x-www-form-urlencoded'}})
                    const fo=await fe.json()
                    rep.send(fo)
}
fetchu()
                  })

                  fastify.get('/logout',(req,rep)=>{
                    rep.clearCookie('statecode', { path: '/redirected' }).clearCookie('id_token', { path: '/' }).clearCookie('refresh',{path:'/'}).clearCookie('email').clearCookie('access_token')
                 rep.redirect('/')
                  })
                      
                  fastify.listen(3000)

