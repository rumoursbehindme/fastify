import Fastify from "fastify";
const fastify=Fastify({logger:true});
import fetch from "node-fetch";

fastify.get('/',(req:any,rep:any)=>{

async function fetchh(){

    const fe=await fetch(' https://trialas2.nxone.com/AgilePointServer/Workflow/GetBaseProcDefID/ProcInst',{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString('base64')}})
    const lo=await fe.json()
    
    const fe1=await fetch(` https://trialas2.nxone.com/AgilePointServer/Workflow/GetActivityInstsByPIID/814D0EDCEE472F8411DD14B8D6F07BF8`,{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString('base64')}})
    const lo1=await fe1.json()
console.log(lo1)
    const fe2=await fetch(` https://trialas2.nxone.com/AgilePointServer/Workflow/GetProcDefGraphics/814D0EDCEE472F8411DD14AE9583FAF3`,{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString('base64')}})
    const lo2=await fe2.json()
    const fe3=await fetch(` https://trialas2.nxone.com/AgilePointServer/Workflow/GetProcDefs`,{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString('base64')}})
    const lo3=await fe3.json()
   
    const fe4=await fetch(` https://trialas2.nxone.com/AgilePointServer/Workflow/GetProcDefNameVersion/814D0EDCEE472F8411DD14AE9583FAF3`,{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString('base64')}})
    const lo4=await fe4.json()
 
    const fe5=await fetch(` https://trialas2.nxone.com/AgilePointServer/Workflow/GetReleasedPID/ProcInst`,{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString('base64')}})
    const lo5=await fe5.json()

    const fe6=await fetch(` https://trialas2.nxone.com/AgilePointServer/Workflow/GetReleasedProcDefs`,{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString('base64')}})
    const lo6=await fe6.json()
    const fe7=await fetch(` https://trialas2.nxone.com/AgilePointServer/Workflow/GetProcInstAttrs/814D0EDCEE472F8411DD14B8D6F07BF8`,{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString('base64')}})
    const lo7=await fe7.json()
    const fe8=await fetch(` https://trialas2.nxone.com/AgilePointServer/Workflow/GetEventsByProcInstID/814D0EDCEE472F8411DD14B8D6F07BF8`,{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString('base64')}})
    const lo8=await fe8.json()
     rep.send(lo8)
  
    const Jdata={
    ProcessID:lo.GetBaseProcDefIDResult,
    ProcessInstID:null,
    ProcInstName:"RjPrcessINstanceName11",
    WorkObjID:"ThisisWorkObjectId18",
    WorkObjInfo: "helllo",
    SuperProcInstID: null,
    Initiator:"nxone\\rajeev.h",
    CustomID:"customidIdu18",
    Attributes:[{XPath:'',Value:"Idu Labellu"},
{Name:"Name",Value:"Rajeev"},{Name:"heading",Value:"Heyt"}],
blnStartImmediately: true,


}

// const pro=await fetch('https://trialas2.nxone.com/AgilePointServer/Workflow/CreateProcInst',{'method':'POST','body':`${JSON.stringify(Jdata)}`,'headers':{'content-type':'application/json','Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString('base64')}})
// const proInst=await pro.json()


const Jdata1={
    attributes: [{ Name: "test1", Value: "test123" },
    { Name: "test2", Value: "test1234"}]

}
// const pro1=await fetch('https://trialas2.nxone.com/AgilePointServer/Workflow/UpdateProcInst/814D0EDCEE472F8411DD14B8D6F07BF8',{'method':'POST','body':`${JSON.stringify(Jdata1)}`,'headers':{'content-type':'application/json','Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString('base64')}})
// const proInst1=await pro1.json()



}
fetchh()

})
fastify.listen(3000)