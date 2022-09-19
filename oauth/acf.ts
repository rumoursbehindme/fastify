import Fastify from 'fastify';
import { userInfo } from 'os';
const fastify = Fastify({logger:true})
const {AuthorizationCode} =require('simple-oauth2');


const client = new AuthorizationCode({
    client: {
      id: '64fac8057f6fd58d9cf0',
      secret: '359d657c239579d2d4ae57ee4899a73c28cb4c53',
    },
    auth: {
      tokenHost: 'https://github.com',
      tokenPath: '/login/oauth/access_token',
      authorizePath: '/login/oauth/authorize',
      
    },
   
   
  });


  const authorizationUri = client.authorizeURL({
    redirect_uri:"http://localhost:3000/redirected",
    scope: 'notifications,repo,user',
    state: '3(#0/!~',
  });

  // Initial page redirecting to Github
  fastify.get('/authoo', (req, res) => {
    console.log(authorizationUri);

    res.redirect(authorizationUri);
  });

  // Callback service parsing the authorization token and asking for the access token
  fastify.get('/redirected', async (req, res) => {
     const code = req.query 
    // console.log('\n\n')
    // console.log(code)
    // console.log('\n\n\n\n\n')
    // console.log(req.query)
  

    const accessToken:any = await client.getToken(code+'1')
    console.log('The resulting token: ', accessToken.token);
//    return res.redirect(accessToken.token.scope.user)
 return res.status(200).send(accessToken.token)
  });



fastify.get('/', (req, res) => {
    res.type('text/html').send('Hello<br><a href="/authoo">Log in with Github</a>');
  });


fastify.listen(3000)

