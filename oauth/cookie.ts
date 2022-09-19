
'use strict'

import Fastify from "fastify"
import { req } from "pino-std-serializers"
import fs from 'fs'
const fastifySession = require('@fastify/session')
const fastifyCookie = require('@fastify/cookie')
const fastifyFormbody = require('@fastify/formbody')

const { loginPage, defaultPage, signup } = require('./html')

const User = require('./user')

interface user {
    email: string
    , password: string
}

let user: user[] | any = User
function plugin(instance: any, options: any, next: any) {
    // register the required plugins
    instance.register(fp(fastifyFormbody))
    instance.register(fastifyCookie)
    instance.register(fastifySession, {
        cookieName: 'sessionId',
        secret: 'afhoir3yr48vt49tvn43vr9vtv3cruwrowi4ug874h',
        cookie: { secure: false },
        expires: 1800000
    })

    // add a login route that returns a login page
    instance.get('/login', (request: any, reply: any) => {
        reply.type('text/html')
        reply.send(loginPage())
    })

    instance.get('/signup', (req: any, rep: any) => {
        rep.type('text/html')
        rep.send(signup())
    })

    instance.post('/signup', (req: any, rep: any) => {

        const signeduser = { email: req.body.email, password: req.body.password }
        user.push(signeduser)


        console.log(user)
        const us = JSON.stringify(user)
        fs.writeFileSync('./user.json', us)
        rep.setCookie('email', user.email, { path: '/login' }).setCookie('password', user.password, { path: '/login' })
        rep.redirect('/login')

    })


    // add a login route that handles the actual login
    instance.post('/login', (request: any, reply: any) => {
        const { email, password } = request.body
        console.log(request.cookies.email)
        console.log(JSON.stringify(request.cookies.email))
       
        if (email === null || password === null) {

            reply.redirect(401, '/login')
        }

        else{
            if(email==='123@gmail.com'&&password==='123'){
                request.session.authenticated = true
                reply.setCookie('email', email, { path: '/' })
                reply.redirect('/')
            }
            else {
                            reply.redirect(401, '/login')
                        }
                    }

                }
                )
    //     else {
    //         if (email === request.cookies.email && password === request.cookies.password||email===User.email&&password===User.password) {
    //             request.session.authenticated = true
    //             reply.setCookie('email', email, { path: '/' })
    //             reply.redirect('/')
    //         } else {
    //             reply.redirect(401, '/login')
    //         }
    //     }
    // });

    instance.get('/', (request: any, reply: any) => {
        reply.type('text/html')

        reply.send(defaultPage(request.session.authenticated, request.cookies.email))
    });

    // add a logout route
    instance.get('/logout', (request: any, reply: any) => {
         reply.clearCookie('email',{path:'/login'}).clearCookie('sessionid',{path:'/'})
          
        if (request.session.authenticated) {
            request.session.destroy((err: any) => {
                if (err) {

                    reply.status(500)
                    reply.send('Internal Server Error')
                } else {
                    reply.clearCookie('email', { path: '/' })
                    reply.redirect('/')
                }
            })
        } else {

            reply.redirect('/')
        }
    });

    next()
}

module.exports = plugin

