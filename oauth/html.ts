import { userInfo } from "os"
import { req } from "pino-std-serializers"


function signup () {
    return '<html>' +
      '<head><title>Login</title></head>' +
      '<body>' +
      '<h1>Login</h1>' +
      '<form action="http://localhost:3000/signup" method="post">' +
      '<h2>Email</h2>' +
      '<input type="email" name="email">' +
      '<h2>Password</h2>' +
      '<input type="password" name="password">' +
      '<br><br><button type="submit">Signup</button>' +
      '</form>' +
      '</body>' +
      '</html>'
  }

function loginPage () {
  return '<html>' +
    '<head><title>Login</title></head>' +
    '<body>' +
    '<h1>Login</h1>' +
    '<form action="http://localhost:3000/login" method="post">' +
    '<h2>Email</h2>' +
    '<input type="email" name="email">' +
    '<h2>Password</h2>' +
    '<input type="password" name="password">' +
    '<br><br><button type="submit">Login</button>' +
    '</form>' +
    '<a href="/signup">Signup</a>'+
    '</body>' +
    '</html>'
}

function defaultPage (isAuthenticated:any,email:any) {
  if (isAuthenticated) {
    return `${email}  logged in<br><br><a href="/logout">Logout</a>`
  } else {
    return 'please login<br><br><a href="/login">Login</a>'
  }
}

module.exports = {
  loginPage,
  defaultPage
  ,signup
}