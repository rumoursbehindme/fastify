import fastify from "fastify"

const users=[{
    id:1 ,
    name:'Not Rajeev'
}
,{
    id:2,
    name:'This is version 2'
}]

module.exports=(fastify:any,opts:any,done:any)=>{
fastify.get('/users',{logSerializers:{user:(va:any)=>`Serialized ${va.url}`}},(req:any,rep:any)=>{
rep.send(users)
})
done()
}


