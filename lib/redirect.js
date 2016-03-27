'use strict'

module.exports = function (options) {
  var name = 'concorda-client-redirect'
  var seneca = this

  var clientKey = options.client.appkey
  function routeExternal (msg, response) {
    msg.role = 'concorda-communication-user'
    msg.appkey = clientKey

    seneca.act(msg, response)
  }

  seneca
    .add('role: user, cmd: login', routeExternal)
    .add('role: user, cmd: register', routeExternal)
    .add('role: user, cmd: create_reset', routeExternal)

  return {
    name: name
  }
}
