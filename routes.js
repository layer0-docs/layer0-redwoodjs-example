const { Router } = require('@layer0/core/router')

module.exports = new Router().match(
  '/:path*',
  ({serveStatic}) => {
    serveStatic('web/dist/:path*')
  }
)