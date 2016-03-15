'use strict'

const Auth = require('seneca-auth')
const Redirect = require('./lib/redirect.js')
const Mesh = require('seneca-mesh')

const _ = require('lodash')
const defaultOptions = {
  concorda: {
    protocol: process.env.CONCORDA_PROTOCOL || 'http',
    host: process.env.CONCORDA_HOST || 'localhost',
    port: process.env.CONCORDA_PORT || 3050,
  },
  client: {
    protocol: process.env.PROTOCOL || 'http',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    key: process.env.CLIENT_KEY || 'not-available'
  },
  restrict: '/api'
}

module.exports = function (opts) {
  var seneca = this

  const options = _.extend(
    {},
    defaultOptions,
    opts
  )

  var name = 'concorda-client'

  seneca
    .use(Auth, options)
//    .use(Redirect, options)
    .use(Mesh, {auto: true})

  function redirectGoogle(args, done){
    return done(
      null,
      {
        http$:
        {
          redirect: `${options.concorda.protocol}://${options.concorda.host}:${options.concorda.port}/auth/google?callback_url=${options.client.protocol}://${options.client.host}:${options.client.port}`
        }
      }
    )
  }

  seneca
    .add('role: concorda, cmd: redirectGoogle', redirectGoogle)

  seneca.act({
    role: 'web', use: {
      name: 'concorda',
      prefix: '/auth',
      pin: {role: 'concorda', cmd: '*'},
      map: {
        redirectGoogle: {GET: true, alias: 'google'}
      }
    }
  })

  return {
    name: name
  }
}
