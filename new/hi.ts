import Fastify from 'fastify';
const fastify=Fastify({logger:true})
import myapptemp from './markos/markojs/myapploginpage.js'
import cookie from '@fastify/cookie';
import mf from '@marko/fastify'
import hometemp from "./markos/markojs/home.js"
import formbody from "@fastify/formbody"
fastify.register(cookie)
fastify.register(formbody)
import * as u from './user.json'




const users=u.users
                  

 fastify.register(mf)
fastify.get('/myapp',(req,rep)=>{
                    const email=`${req.cookies.email}`
                    const userdetails=users.find((ud:{email:string})=>ud.email===email)
                    if(userdetails?.email!=email){
                    rep.marko(myapptemp)
                    }
                    else{
                                        rep.redirect('/')
                    }
})

fastify.post('/myapp',(req,rep)=>{
                    const {email,password}:any=req.body;
                    const userdetails=users.find((ud:{email:string})=>ud.email===email)
                    if(email===userdetails?.email&&password===userdetails?.password){
                                        rep.setCookie('email',email,{path:'/'})
                                        rep.redirect('/');
                    }
                    else{
                                        throw new Error("Error Bantu guru");
                    }
})

fastify.get('/',(req,rep)=>{
                    rep.marko(hometemp,{email:req.cookies.email})
})

fastify.listen({port:3000})