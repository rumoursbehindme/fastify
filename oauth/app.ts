import Fastify from "fastify";
const fastify=Fastify({logger:true})
const plugin =require('./cookie')
fastify.register(plugin)

fastify.listen(3000)