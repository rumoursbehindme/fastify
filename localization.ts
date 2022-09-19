import Fastify from 'fastify'
import middleware from 'i18next-http-middleware'
import i18next, { t } from 'i18next'
import Backend from 'i18next-fs-backend'
import resbundle from 'i18next-resources-to-backend'
import { req, res } from 'pino-std-serializers'
import formdata from '@fastify/formbody'
import fastifyflash from '@fastify/flash'
// const fs=fs1
// let jsonData = {}
// fs.readFile('', 'utf-8', (err, data) => {
//   if (err) throw err

//   jsonData = JSON.parse(data)
// })




const fastify = Fastify({ logger: true })
fastify.register(formdata)
const bundle = {
  lng: 
   {
    welcome:{
      "key": "value"
    },
    comeagain:{
      "key": "value"
    },

   }
  
};

i18next.use(Backend).use(middleware.LanguageDetector).init({

  preload: ['en'],
  ns:['welcome'],
  defaultNS:"welcome",
  
  fallbackLng: "en",
  backend: {
    // backends:[
    //   Backend,
    //   resbundle(bundle)
    // ],
    loadPath: './locales/{{lng}}/{{ns}}.json',
    //addPath:'./locales/add/{{lng}}/{{ns}}'
    
  }
})

fastify.register(middleware.plugin,{i18next})
// fastify.register()
fastify.register(fastifyflash)
console.log(i18next.t('key',{lng:'kn'}))

fastify.get('/',(req,rep)=>{
  console.log(i18next.exists('key'))
  rep.send(req.t('key',{lng:'en'}))
})

fastify.get('/g',(req,rep)=>{
  i18next.reloadResources('en', 'comeagain')
  //i18next.loadNamespaces('comeagain')
  rep.type('text/html').send(req.t('key',{lng:'en',ns:'comeagain'}))
})


fastify.get('/kan',(req,rep)=>{
 
  i18next.loadLanguages('kn')
  //console.log(i18next.getFixedT('kn','welcome','key'))
  rep.send(req.t('key',{lng:'kn'}))
})

fastify.get('/kanb',(req,rep)=>{
  i18next.loadLanguages('kn')
  i18next.loadNamespaces('comeagain')
  rep.send(req.t('key',{lng:'kn',ns:'comeagain'}))
})


fastify.get('/ar',(req,rep)=>{

  rep.send(req.t('key',{lng:'ar'}))
})



fastify.listen(300)