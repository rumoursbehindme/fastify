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


const client_id = "0oa67hyu6u8gNRy255d7"
const client_Secret = "RSogDYzZPKKGnPNZ_lR57Fk4yTeAR5QOV0LDTHax"
const redirect_url = "http://localhost:3000/redirected"


fastify.register(cookie)

fastify.get('/', (req: any, rep: any) => {
                    const nonce = `${randomstring.generate(45)}`
                    const statecode = `${randomstring.generate(45)}`
                    rep.setCookie('statecode', statecode, { path: '/redirected', httpOnly: true }).setCookie('nonce', nonce, { path: '/redirected', httpOnly: true })
                    console.log(code_challenge); // -
                    rep.type('text/html').send(`<h1>Helllllooooooooo</h1><a href="https://dev-99832846-admin.okta.com/oauth2/v1/authorize?client_id=${client_id}&scope=openid%20offline_access&response_type=code&redirect_uri=${redirect_url}&nonce=${nonce}&state=${statecode}&code_challenge=${code_challenge}&code_challenge_method=S256">Login</a>`)
                   
})

fastify.get('/redirected',(req:any,rep:any)=>{
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
                                  
                                          const fe = await fetch(`https://dev-99832846-admin.okta.com/oauth2/v1/token?grant_type=authorization_code&code=${code.code}&code_verifier=${code_verifier1}&client_id=${client_id}&client_secret=${client_Secret}&redirect_uri=http://localhost:3000/redirected`, { 'method': 'POST', 'headers': { 'Content-Type': 'application/x-www-form-urlencoded' } })
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
                                  rep.send('hi')
                                           // rep.type('text/html').send(`<h1>User ${decoded.email.toLocaleUpperCase()} is logged in \n\n Refresh token is ${js.refresh_token}</h1><a href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=${client_id}&redirect_uri=http://localhost:3000/resource&response_type=code&scope=${scope}">access for google drive</a><br></br><form action="/logout"><button type="submit">Logout</button></form>`)
                                  
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

fastify.listen(3000)