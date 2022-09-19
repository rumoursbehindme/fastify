import Fastify from 'fastify'
const fastify=Fastify({logger: {

                    transport: {
                      target: 'pino-pretty'
                    },
                    // serializers: {
                    //   res (reply) {
                    //     // The default
                    //     return {
                    //       statusCode: reply.statusCode
                    //     }
                    //   },
                    //   req (request) {
                    //     return {
                    //       method: request.method,
                    //       url: request.url,
                    //       path: request.routerPath,
                    //       parameters: request.params,
                    //       // Including the headers in the log could be in violation
                    //       // of privacy laws, e.g. GDPR. You should use the "redact" option to
                    //       // remove sensitive fields. It could also leak authentication data in
                    //       // the logs.
                    //       headers: request.headers
                    //     };
                    //   }
                    // }
                  }})


fastify.get('/',(req,rep)=>{
//       req.log.error('error ayaaa bc')
      rep.send("helllo")
      fastify.log.info('Hellooooo')
})
fastify.log.info("Jai marikambe")

fastify.listen(3000)