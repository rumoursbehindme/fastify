import Fastify from "fastify";
const fastify=Fastify({logger:true})

import fetch from 'node-fetch'



const username="nxone\rajeev.h"
const password="m-6G!Tw27g"
const bas4=Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")
console.log('\n\n'+bas4+'\n\n')

fastify.get('/',(req:any,rep:any)=>{
 async function fetchh() {
    
        const fe=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/GetRegisterUsers`,{'method':'GET','headers':{'Host': 'nxone.com','Content-Type':'application/json','Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
         const lo= await fe.json()
         //console.log(lo)
         rep.send(lo)
    }
    fetchh()
})

fastify.get('/di',(req:any,rep:any)=>{
    async function fetchh() {
       
           const fe=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/GetDatabaseInfo`,{'method':'GET','headers':{'Host': 'nxone.com','Content-Type':'application/json','Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
            const lo= await fe.json()
            //console.log(lo)
            rep.send(lo)
       }
       fetchh()
   })
fastify.get('/wb',(req:any,rep:any)=>{
    async function fetchh() {
       
           const fe=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/GetWebhookTriggers`,{'method':'GET','headers':{'Host': 'nxone.com','Content-Type':'application/json','Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
            const lo= await fe.text()
            
           const fe1=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/IsReportV2ServicesEnabled`,{'method':'GET','headers':{'Host': 'nxone.com','Content-Type':'application/json','Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
           const lo1= await fe1.text()
            //console.log(lo)
            rep.send(JSON.stringify(fe1)+"\n\n"+lo)
       }
       fetchh()
    })
fastify.get('/getsingleuser',(req:any,rep:any)=>{
    async function fetchh() {
         const obj={userName:"nxone\\rajeev.h"}
        const fe=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/GetRegisterUser`,{'body':`${JSON.stringify(obj)}`,'method':'POST','headers':{'Host': 'nxone.com','Content-Type':'application/json','Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
         const lo= await fe.text()
         
         const fee=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/c`,{'method':'GET','headers':{'Host': 'nxone.com','Content-Type':'application/json','Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
         const feelo=await fee.text()
        console.log(lo+feelo)
        

        const fetch1= await  fetch('https://trialas2.nxone.com/AgilePointServer/Admin/GetSystemUser',{'method':'GET','headers':{'Host': 'nxone.com','Content-Type':'application/json','Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
                const lofetch1=await fetch1.text()


        const fetch2= await  fetch('https://trialas2.nxone.com/AgilePointServer/Admin/GetAccessRightNames',{'method':'GET','headers':{'Host': 'nxone.com','Content-Type':'application/json','Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
                const lofetch2=await fetch2.text()

                var JSONObject = {
                    FromUser: "nxone\\shivani.saboji",
                    ToUser: "nxone\\suhail.shahapur",
                    Status: "Active"
                  };      
        const fetch4=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/GetDelegations`,{'body':`${JSON.stringify(JSONObject)}`,'method':'POST','headers':{'Host': 'nxone.com','Content-Type':'application/json','Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
        const lofetch4= await fetch4.text()
         console.log(JSON.parse(lofetch4))

         const fetch5=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/GetGroups`,{'method':'GET','headers':{'Host': 'nxone.com','Content-Type':'application/json','Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
         const lofetch5= await fetch5.text()
        
         const fetch6=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/GetGroup/Rama`,{'method':'GET','headers':{'Host': 'nxone.com','Content-Type':'application/json','Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
         const lofetch6= await fetch6.text()
         
         const fetch7=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/GetGroupMembers/Rama`,{'method':'GET','headers':{'Host': 'nxone.com','Content-Type':'application/json','Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
         const lofetch7= await fetch7.text()

        rep.send("singleuser : "+lo+"\n\n\n"+"SenderEmailAddress : "+feelo+"\n\n\n"+"sysADmin : "+lofetch1+"\n\n\n"+"GetAccessRightNames  : "+lofetch2+"\n\n\n"+"GetDelegations : "+lofetch4+"\n\n\n"+"GetGroups : "+lofetch5+"\n\n\n"+"GetGroup by groupname : "+lofetch6+"\n\n\n"+"GetGroup by groupname : "+lofetch7)
    }
    fetchh()
})

fastify.get('/sm',(req:any,rep:any)=>{
    async function fetchh() {
       
     const fetch3=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/GetAllEMailTemplates`,{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
           const lofetc3=await fetch3.text()  
           rep.send(lofetc3)
           
    }
       fetchh()
   })
   fastify.get('/smd',(req:any,rep:any)=>{
    async function fetchh() {
       
     const fetch3=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/GetWebhookNotifierCommonHeaders`,{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
           const lofetc3=await fetch3.text()  
           const fetch4=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/GetWebhookTriggerCategories`,{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
           const lofetc4=await fetch4.text()  
           rep.send(lofetc4+"\n\n"+lofetc3)
           
    }
       fetchh()
   })
   fastify.get('/roles',(req:any,rep:any)=>{
   
   })

   fastify.get('/smtp',(req:any,rep:any)=>{
    async function fetchh() {
       
     const fetch3=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/GetSmtpServer`,{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
           const lofetc3=await fetch3.text()  
           

           const fetc=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/GetSysPerfInfo`,{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
           const lofetc=await fetc.text() 
           
           const fetc1=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/GetSystemUser`,{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
           const lofetc1=await fetc1.text()   

           const fetc5=await fetch(`https://trialas2.nxone.com/AgilePointServer/Admin/GetWebhookNotifications`,{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString("base64")}})
           const lofetc5=await fetc5.text()  

            rep.send(lofetc+"\n\n"+lofetc3+"\n\n"+lofetc1+"\n\n"+lofetc3+"\n\n"+lofetc5)
           
    }
       fetchh()
   })
fastify.listen(3000)


