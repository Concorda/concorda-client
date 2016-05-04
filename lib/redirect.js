'use strict'

module.exports = function (options) {
  var name = 'concorda-client-redirect'
  var seneca = this

  var clientKey = options.client.appkey

  function routeExternal (msg, response) {
    msg.role = 'concorda-communication-user'
    msg.cmd = 'concorda-' + msg.cmd
    msg.appkey = clientKey

    seneca.act(msg, response)
  }

  function routeExternalAuth (msg, response) {
    msg.role = 'concorda-communication-auth'
    msg.cmd = 'concorda-' + msg.cmd
    msg.appkey = clientKey

    seneca.act(msg, response)
  }

  seneca
    .add('role: user', routeExternal)
    .add('role: auth, cmd: register', routeExternalAuth)
    .add('role: auth, cmd: create_reset', routeExternalAuth)

  return {
    name: name
  }
}
