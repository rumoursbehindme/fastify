import Fastify from 'fastify';
const fastify = Fastify({logger:true})
const ps = require('prompt-sync')
const axios = require('axios')
const prompt = ps()
const fetch=require('node-fetch')
let blogs: any = [{
    id: 1,
    name: 'Rajeev'
},
{
    id: 2,
    name: 'No'
}
]
const addblogValidation = {
    body: {
        type: 'object',
        required: ['name']
        , properties: {
            name: { type:'string' }
        }
    },
    response: {
        200: { type: 'object', properties: { id: { type: 'integer' }, title: { type: 'string' } } }
    }
}

fastify.listen(3000)

fastify.route({
    method: 'GET',
    url: '/blogs',
    handler: function (req, rep) {
        console.log(blogs)
        return rep.type('application/json').send(blogs)

    }

})

fastify.route({
    method: 'POST',
    schema: addblogValidation,
    url: '/blogs/add/blog',
    handler:function(req:any, reply:any)  {
        const id = blogs.length + 1   // generate new ID
        const newBlog = {
            id,
            name: req.body.name
        }
        console.log(newBlog)
        blogs.push(newBlog)
        console.log(blogs)
        return reply.redirect('/')
    }
    }

)
fastify.route({
    method: 'GET',
    url: '/blogs/:id',
    handler: function (req: any, rep) {
        const id = Number(req.params.id)
        const blog = blogs.find((blog: { id: number }) => blog.id === id)
        console.log(blog)
        return rep.type('application/json').send(blog)
    }
})

fastify.route({
    method: 'PUT',
    url: '/blogs/edit/:id',
    handler: function (req: any, rep: any) {
        const id = Number(req.params.id)
        blogs = blogs.map((blog: { id: any, name: any }) => {
            if (blog.id === id) {
                
                return {
                    id,
                    name: String(req.body.name)
                }
                
            }
           
            return {
                id: blog.id,
                name: blog.name
            }
            

        }
        
        )
        console.log(blogs)
        return rep.redirect('/')
    }
})

