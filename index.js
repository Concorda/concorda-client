'use strict'

module.exports = function (options) {
  var seneca = this

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
          redirect: 'http://localhost:3050/auth/google?callback_url=http://localhost:3000'
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
