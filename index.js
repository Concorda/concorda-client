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
    appkey: process.env.CLIENT_KEY || 'not-available'
  },
  auth: {
    restrict: '/api'
  },
  transport: {
    active: false,
    type: 'tcp'
  },
  mesh: {
    active: false,
    auto: true
  }
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
    .use(Auth, options.auth)
    .use(Redirect, options)
  if (options.mesh.active === true || options.mesh.active === 'true') {
    seneca.log.info('Use mesh communication', options.mesh)
    seneca
      .use(Mesh, {auto: true})
  }
  if (options.transport.active === true || options.transport.active === 'true') {
    seneca.log.info('Use transport communication', options.transport)
    seneca
      .client(options.transport)
  }

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

  function localPing(msg, response){
    this.act('role: concorda-communication, cmd: ping', response)
  }

  seneca
    .add('role: concorda, cmd: redirectGoogle', redirectGoogle)
    .add('role: concorda, cmd: localPing', localPing)

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

  seneca.act({
    role: 'web', use: {
      name: 'concorda',
      prefix: '/concorda',
      pin: {role: 'concorda', cmd: '*'},
      map: {
        localPing: {GET: true, alias: 'ping'}
      }
    }
  })

  return {
    name: name
  }
}
