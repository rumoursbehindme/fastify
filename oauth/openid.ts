import Fastify from "fastify";
const fastify = Fastify({ logger: true })
import fetch from 'node-fetch'
import IdTokenVerifier from 'idtoken-verifier';
import jwt_decode from 'jwt-decode'
import { json } from "stream/consumers";
import { parse } from "path";
import randomstring from "randomstring";

import crypto from "crypto";
import base64url from "base64url";
import fp from 'fastify-plugin'
import { FastifyCookieOptions } from '@fastify/cookie'
import { req } from "pino-std-serializers";
// import cookie from '@fastify/cookie'
import fastifySession from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
import fastifyFormbody from '@fastify/formbody';
//const code_verifier='ahwfvkwekfbwjegtbf+++---wejgbjhbg2943233298475349393009'
const code_verifier1 = randomstring.generate(128);

const base64Digest = crypto
  .createHash("sha256")
  .update(code_verifier1)
  .digest("base64");

console.log(base64Digest); // +PCBxoCJMdDloUVl1ctjvA6VNbY6fTg1P7PNhymbydM=

const code_challenge = base64url.fromBase64(base64Digest);

const client_id = "987168092680-lg07l12fbancbfov8hrm0anbmh3mg52e.apps.googleusercontent.com"
const client_Secret = "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"
const redirect_url = "http://localhost:3000/redirected"

const scope = 'https://www.googleapis.com/auth/drive.metadata.readonly'



function plugin(fastify: any, options: any, next: any) {
  // register the required plugins
  fastify.register(fastifyFormbody)
  fastify.register(fastifyCookie)
  fastify.register(fastifySession, {
    cookieName: 'sessionId',
    secret: 'afhoir3yr48vt49tvn43vr9vtv3cruwrowi4ug874h',
    cookie: { secure: false },
    expires: 1800000
  })
  // const verif='1fnsoentvw23ycr3cr2y3r2382y8724t7rtb8vb92bv0-v----v4'
  // const code_C=verif
  // interface c{
  //   state:string,
  //   nonce:string,
  //   code_challenge:string
  // }
  // let cooo:c={
  //   state:`${randomstring.generate(64)}`,
  //   nonce:`${randomstring.generate(64)}`,

  //  code_challenge:`${code_challenge}`
  // }
  fastify.get('/', (req: any, rep: any) => {
    const nonce = `${randomstring.generate(45)}`
    const statecode = `${randomstring.generate(45)}`
    rep.setCookie('statecode', statecode, { path: '/redirected', httpOnly: true }).setCookie('nonce', nonce, { path: '/redirected', httpOnly: true })
    console.log(code_challenge); // -
    rep.type('text/html').send(`<h1>Helllllooooooooo</h1><a href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=${client_id}&scope=openid%20email profile&response_type=code&redirect_uri=${redirect_url}&nonce=${nonce}&state=${statecode}&code_challenge=${code_challenge}&code_challenge_method=S256">Login</a>`)

  })

  fastify.get('/redirected', (req: any, rep: any) => {
    req.session.authenticated = true
    console.log(`Userrrr : ${JSON.stringify(req.session.user)}`)
    console.log(req.cookies)
    console.log(req.query)
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
        rep.setCookie('access_token', js.access_token, { path: '/logout' }).setCookie('id_token', js.id_token, { path: '/logout' }).setCookie('refresh', js.refresh_token)
        const decoded: dec = await jwt_decode(js.id_token)

        console.log(`\n\n${JSON.stringify(decoded)}\n\n`)

        //  const clo= await fetch(`https://accounts.google.com/cloud-platform/v2/files?access_token=${js.access_token}&token_type=${js.token_type}&client_id=${client_id}&client_secret=${client_Secret}`,{'headers':{'content-type':'application/x-www-form-urlencoded'}})
        //  const clou=await clo.
        //  rep.send(clou)

        if (decoded.nonce == req.cookies.nonce) {

          rep.type('text/html').send(`<h1>User ${decoded.email.toLocaleUpperCase()} is logged in</h1><a href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&client_id=${client_id}&redirect_uri=http://localhost:3000/resource&response_type=code&scope=${scope}">access for google drive</a><br></br><form action="/logout"><button type="submit">Logout</button></form>`)

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

  fastify.get(`/logout`, (request: any, reply: any) => {

    reply.setCookie('sessionid', 'invalid', {
      expires: 0,
      maxAge: 0
    }).setCookie('id_token', 'invalid', {
      expires: 0,
      maxAge: 0
    }).setCookie('access_token', 'invalid', {
      expires: 0,
      maxAge: 0
    }).redirect('/')
  })
  fastify.get('/resource', (req: any, rep: any) => {

    interface ex {
      code: string,
      scope: string,
      state: string,
    }
    const code: ex | any = (req.query)
    console.log(code.code)

    async function fetchhh() {

      const fe = await fetch(`https://accounts.google.com/o/oauth2/token?grant_type=authorization_code&code=${code.code}&client_id=${client_id}&client_secret=${client_Secret}&redirect_uri=http://localhost:3000/resource`, { 'method': 'POST' })
      interface jss {
        access_token: string,
        expires_in: number
        scope: string
        token_type: string
        refresh_token: string
      }
      const js: jss = await fe.json()
      console.log(js)

      console.log({ access_token: js.access_token })
      const resource = await fetch(`https://www.googleapis.com/drive/v2/files?client_id=${client_id}&client_secret=${client_Secret}&token_type=${js.token_type}&access_token=${js.access_token}`, { 'headers': { 'content-type': 'application/x-www-form-urlencoded' } })
      const lo = await resource.text()
      rep.type('application/json').send(lo)
    }

    fetchhh()
  })
  fastify.listen(3000)
  next()
}
module.exports = plugin