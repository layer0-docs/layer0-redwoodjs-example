const { Router } = require('@layer0/core/router')

module.exports = new Router()
  // send any unmatched request to origin
  .fallback(({ proxy }) => proxy('origin'))