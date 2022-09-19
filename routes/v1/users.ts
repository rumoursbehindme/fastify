import fastify from "fastify"

const users=[{
    id:1 ,
    name:'Rajeev'
}
,{
    id:2,
    name:'NoName'
}]

module.exports=function fastPlug(fastify:any,opts:any,done:any){
    fastify.get('/users',(req:any,rep:any)=>{
    rep.send(users)
    })
    done()
    }
    
