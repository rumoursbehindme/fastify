import { time } from "console";
import Fastify, { FastifyInstance, FastifyReply } from "fastify";
const fastify=Fastify({logger:true})
import fp from 'fastify-plugin'
import { fstat } from "fs";
import { Server } from "http";
import { ServerOptions } from "https";
import { req } from "pino-std-serializers";
import { REPL_MODE_SLOPPY } from "repl";
function handler(req:any,rep:any){
  rep.send(rep.context.config.output)
}

// declare module 'fastify'{
//     interface FastifyReply{
//         util:string
//     }
   
// }

fastify.register(require('./routes/v1/users'),{prefix:'/v1',logLevel:'warn'})
fastify.register(require('./routes/v2/users'),{prefix:'/v2'})


fastify.get('/config', { config: { output: 'hello world!' } },handler);

fastify.get('/redirect',(req,rep)=>{
    rep.redirect(300,'/rep')
    const mil=rep.getResponseTime()
    console.log(mil)
})
fastify.get('/rep',(req,rep:any)=>{
    console.log(rep.header['Etag'])
rep.header('content-type','text/html').send('<h1>Hello</h1>').statusCode
})

fastify.get('/hijack',(req,rep:any)=>{

    rep.type('application/json').hijack().send({hello:'world'})})


fastify.get('/type',(req,rep:any)=>{
    rep.type('application/json').send({hello:'world'})})  // fastify.get('/rep',(req,rep:any)=>{


// fastify.register(fp((fastify:FastifyInstance,opt:any,done:any)=>
//     {        fastify.decorate('util','server util');
//               done()
//     }

//     )
//     );
    
    fastify.get('/tr',(request:any,reply:any)=>{
    reply.header('set-cookie','foo')
    })


    function logincheck(){
        
    }

fastify.listen(3000)