'use strict'

module.exports = function (options) {
  var seneca = this

  var name = 'concorda-client'

  seneca
    .use('auth', {restrict: '/api'})
    .use('mesh', {auto: true})

  seneca.route({
    method: 'GET',
    path: '/auth/google',
    handler: function (request, reply) {
      reply.redirect('http://localhost:3050/auth/google?callback_url=http://localhost:3000')
    }
  });

  return {
    name: name
  }
}
