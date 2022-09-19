import Fastify from "fastify";
import i18next, { t } from 'i18next'
import Backend from "i18next-fs-backend";
import middleware from 'i18next-http-middleware'
i18next.init({
                    preload:['en'],
                    ns:['file1'],
                    resources:{
                              en:{
                                        file1:{key:"HEY"},
                                        file2:{key:"HEllo"}
                              },
                              kn:{
                                        file1:{key:"Namaskar"},
                                        file2:{key:"vandane"}
                              }
                    }
})

console.log(i18next.t('key',{ns:'file2',lng:'kn'}))