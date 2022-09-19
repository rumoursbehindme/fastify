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

//console.log(i18next.reloadResources('kn', 'file2'))
i18next.setDefaultNamespace('file2')
console.log(i18next.t('key',{lng:'en'}))
console.log(i18next.dir('ur'))
// i18next.on('initialized',function({lng,ns}){
//  console.log({lng})
//  console.log({ns})
              
// })

// i18next.init({lng:"en",
// preload:['en','kn'],
// ns:['file1','file2'],
// fallbackNS:['file1']
// ,resources:{
//            en:{
//                                         file1:{key:"HEYYY"},
//                                         file2:{key:"HELLLO"},
//                                          file4:{key:'jai Bhajarangi'}
//                     },
//                     kn:{
//                                         file1:{key:"namaskara"},
//                                         file2:{key:"Vandane"},
//                                         file5:{key:"Vandane"}
// }
// }})

// i18next.on('languageChanged',function(lng){
//                     console.log(lng)
// })

// i18next.changeLanguage('en')

// console.log(i18next.getResource('en','file2','key'))

// i18next.addResource('en','file3','key','nice1')

// console.log(i18next.t('key',{ns:'file3'}))

// console.log(i18next.resolvedLanguage)

// console.log(i18next.t('key',{lng:'en',ns:'file4'}))

// console.log(i18next.t('key',{lng:'kn',ns:'file5'}))


//  //i18next.loadNamespaces('file9',()=>{console.log(i18next.t('key',{ns:'file9'}))})


// console.log(i18next.hasResourceBundle('en','file2'))
// console.log(i18next.getDataByLanguage('en'))
// console.log(i18next.getResourceBundle('en', 'file3'))

// const fix=i18next.getFixedT('en','file4')
// console.log(fix('key'))
