import Fastify from "fastify";
import { err } from "pino-std-serializers";
import fetch from "node-fetch";

const fastify=Fastify({
logger:{
//                 transport:{target:'pino-pretty'},

                    level:'info'
}
})



fastify.get('/',async(req,rep)=>{
const data:any={
             hello:'hello'       
}
const fe= await fetch('/',{'body':data,'method':'POST'})
const fo=await fe.json()
if(req.body){
                                        req.log.info('Success')
                                        rep.send("success")
                    }

                    else{
                                        req.log.error('Error bro')
                                        throw new Error('Dodd error idu')
                                        
                                        
                                        
                    }
})

// fastify.post('/',(req,rep)=>{
//                     const hello=req.body
//                     if(hello=='hello')
//          rep.redirect('/')
//          else{
//                     rep.redirect('/')
//          }
// })



fastify.listen(3000)