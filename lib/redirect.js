'use strict'

module.exports = function (options) {
  var name = 'concorda-client-redirect'
  var seneca = this

  var clientKey = options.client.key
  seneca.log.info('Concorda client key', clientKey)

  function routeExternal (msg, response) {
    msg.role = 'concorda-communication-user'
    msg.clientKey = clientKey
    seneca.act(msg, response)
  }

  seneca
    .add('role: user', routeExternal)

  return {
    name: name
  }
}
