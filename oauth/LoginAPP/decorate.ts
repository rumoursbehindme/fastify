import { doesNotMatch } from 'assert';
import Fastify from 'fastify';
import fp from 'fastify-plugin'

const fastify=Fastify({logger:true})


fastify.register((fastify:any,opt:any,done:any)=>{

    fastify.get('/',(req:any,rep:any)=>{
        rep.send(fastify.fun(4,5))
    })
    // console.log(fastify.fun(10,30));
  
    done();
});
fastify.register(fp((fastify: any, opt: any, done:any) => {
    fastify.register(fp(async (context:any) => {
        context.decorate('fun', (a: number, b: number) => a + b);
        
    }))
    
   
    function d(fastify:any, opts:any, done:any){
        fastify.decorate('hi',"hello")
        done()
    }
    fastify.register(fp(d))
   
    console.log(fastify.hasDecorator('fun'));
    
    // console.log(fastify.fun(1, 2));


    fastify.register(async(fastify: any, opt:any, done: any) => {
        // console.log(fastify.fun(20, 40));
       
    });
    done();

}));

fastify.listen(3000)