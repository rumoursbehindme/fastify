import Fastify from 'fastify'
const fastify =Fastify({logger:true})
import fetch from 'node-fetch'
import IdTokenVerifier from 'idtoken-verifier';
import jwt_decode from 'jwt-decode'
import { json } from "stream/consumers";
import { parse } from "path";
const randomstring = require("randomstring");
const crypto = require("crypto");
const base64url = require("base64url");
import fp from 'fastify-plugin'
const cookie =require('@fastify/cookie')
import { FastifyCookieOptions } from '@fastify/cookie'

fastify.register(fp(cookie))

const client_id="987168092680-lg07l12fbancbfov8hrm0anbmh3mg52e.apps.googleusercontent.com"
const client_Secret="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"
const redirect_url="http://localhost:3000/redirected"

fastify.get('/',(req,rep)=>{
    // const statecode=randomstring.generate(128)
    const nonce=randomstring.generate(128)
    rep.setCookie('nonce',nonce)
    rep.type('text/html').send(`<h1>Helllllooooooooo</h1><a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&scope=openid%20email profile&response_type=code&redirect_uri=${redirect_url}&nonce=${nonce}">Login</a>`)
    })


fastify.get('/redirected',(req,rep)=>{


})
fastify.listen(3000)