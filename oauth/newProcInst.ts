import Fastify from "fastify";
const fastify=Fastify({logger:true});
import fetch from "node-fetch";

fastify.get('/',(req:any,rep:any)=>{


async function fetchh(){

    const fe=await fetch(' https://trialas2.nxone.com/AgilePointServer/Workflow/GetBaseProcDefID/ProcInst',{'method':'GET','headers':{'Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString('base64')}})
    const lo=await fe.json()
    const Jdata={
        ProcessID:lo.GetBaseProcDefIDResult,
        ProcessInstID:null,
        ProcInstName:"Rj127",
        WorkObjID:"WorkObjectid",
        WorkObjInfo: "helllo",
        SuperProcInstID: null,
        Initiator:"nxone\\rajeev.h",
        CustomID:"WorkObjectid",
        Attributes:[{Name:'/pd:AP/pd:formFields/pd:Label',Value:"Idu Labellu"},
    {Name:"/pd:AP/pd:formFields/pd:Name",Value:"Rajeev"}],
    blnStartImmediately: true,
    
    
    }
    
     const pro=await fetch('https://trialas2.nxone.com/AgilePointServer/Workflow/CreateProcInst',{'method':'POST','body':`${JSON.stringify(Jdata)}`,'headers':{'content-type':'application/json','Authorization':"Basic "+Buffer.from("nxone\\rajeev.h:m-6G!Tw27g").toString('base64')}})
     const proInst=await pro.json()
    rep.send(proInst)


}
fetchh()

})
fastify.listen(3000)
    