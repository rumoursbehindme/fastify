
import { compileFileSync } from '@marko/compiler'
import fs from 'fs'


const hellopage=compileFileSync('./markos/markofiles/hello.marko',{output:"html"})
const loginpage=compileFileSync('./markos/markofiles/loginpage.marko',{output:"html"})
const homepage=compileFileSync('./markos/markofiles/home.marko',{output:"html"})
const myapploginpage=compileFileSync('./markos/markofiles/myapplogin.marko',{output:"html"})

// fs.writeFileSync('marko.js',sr.code)
fs.writeFileSync('./markos/markojs/loginpage.js',loginpage.code)
fs.writeFileSync('./markos/markojs/hello.js',hellopage.code)
fs.writeFileSync('./markos/markojs/home.js',homepage.code)
fs.writeFileSync('./markos/markojs/myapploginpage.js',myapploginpage.code)

