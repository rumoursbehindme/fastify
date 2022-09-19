import { FastifyPlugin } from "fastify";
import accepts, { Accepts } from "accepts";

declare module 'fastify' {
  interface FastifyRequest extends Accepts {
    accepts(): Accepts;
  }
  interface FastifyReply {
    requestAccepts: Accepts
    requestCharset: Accepts["charset"];
    requestCharsets: Accepts["charsets"];
    requestEncoding: Accepts["encoding"];
    requestEncodings: Accepts["encodings"];
    requestLanguage: Accepts["language"];
    requestLanguages: Accepts["languages"];
    requestType: Accepts["type"];
    requestTypes: Accepts["types"];
  }

}

export interface FastifyAcceptsOptions{
  
  decorateReply:boolean;

}

declare const fastifyPlugin:FastifyPlugin<FastifyAcceptsOptions>;

export default  fastifyPlugin;