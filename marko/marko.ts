const compiler=require('@marko/compiler')
const fs =require( 'fs')
compiler.configure({
                    output: "dom",
                    sourceMaps:true
                  });

                  const syncResult = compiler.compileFileSync("./temp.marko",{
                    output:'dom'
                  });
                   export const js=syncResult.code
                   console.log(syncResult.code)
                   fs.writeFileSync('d.js',syncResult.code)

 