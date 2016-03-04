'use strict'

const _ = require('lodash')
const defaultOptions = {
  concordaProtocol: 'http',
  concordaHost: 'localhost',
  concordaPort: 3050,
  protocol: 'http',
  host: 'localhost',
  port: 3000
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
    .use('auth', {restrict: '/api'})
    .use('mesh', {auto: true})

  function redirectGoogle(args, done){
    return done(
      null,
      {
        http$:
        {
          redirect: `${options.concordaProtocol}://${options.concordaHost}:${options.concordaPort}/auth/google?callback_url=${options.protocol}://${options.host}:${options.port}`
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
