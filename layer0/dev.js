const { createDevServer } = require('@layer0/core/dev')

module.exports = function() {
  return createDevServer({
    label: 'Redwood',
    command: () => 'yarn rw dev',

    ready: [/listening on/i],
    filterOutput: line => !line.match(/some pattern/),
  })
}