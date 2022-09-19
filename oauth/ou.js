'use strict'

const fastify = require('fastify')({ logger: { level: 'trace' } })
// const sget = require('simple-get')

// const oauthPlugin = require('fastify-oauth2')
const oauthPlugin = require('@fastify/oauth2')

fastify.register(oauthPlugin, {
  name: 'facebookOAuth2',
  credentials: {
    client: {
      id: '803031627296502',
      secret: '44df4d2daf4196d1edc53bb3513c76ea'
    },
    auth: oauthPlugin.FACEBOOK_CONFIGURATION
  },
  startRedirectPath: '/',
  callbackUri: 'http://localhost:3000/redirect'
})

fastify.get('/login/facebook/callback', function (request, reply) {
  this.facebookOAuth2.getAccessTokenFromAuthorizationCodeFlow(request, (err, result) => {
    if (err) {
      reply.send(err)
      return
    }

    sget.concat({
      url: 'https://graph.facebook.com/v6.0/me',
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + result.access_token
      },
      json: true
    }, function (err, res, data) {
      if (err) {
        reply.send(err)
        return
      }
      reply.send(data)
    })
  })
})

fastify.listen(3000)