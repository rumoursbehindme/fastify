import Fastify from "fastify";
const fastify=Fastify({logger:true})
const prompt=require('prompt-sync')

console.log('1..blogs')
console.log('2..Specific blog')
console.log('3..Add blogs')
console.log('4..edit blogs')
console.log('5..Delete blogs')

do{
   var br=true
   let ch=prompt("Enter ur choice")
   switch(ch){
      case 1: fetch(`http://localhost:3000/blogs`).then((res)=>res.json()).then((res)=>console.log(res))
      case 6: br= false
   }
}while(br=false)
