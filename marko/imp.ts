import Fastify from 'fastify';
import mp from "@marko/fastify"
 import  _marko_template  from './d.js';
//import {hello} from './hello'
const fastify=Fastify({logger:true})

//const hey = hello()
fastify.register(mp)


fastify.get('/',(req,rep)=>{
  rep.marko(_marko_template)
})

fastify.listen({port:3000})