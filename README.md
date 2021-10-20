# Example Redwood Application Deployed on Layer0

## Setup

We use Yarn as our package manager. To get the dependencies installed, just do this in the root directory:

```terminal
yarn
```

## Develop

### Start Redwood development server

```terminal
yarn rw dev
```

### Start development server with Layer0

```terminal
yarn layer0 dev
```

Your browser should open automatically to `http://localhost:8910` to see the web app.

![home-page-localhost-8910](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ijenahgpkabvms5qfbpo.png)

## Deploy

### Build static assets with Layer0

```terminal
yarn layer0 build
```

### Deploy to Layer0

```terminal
yarn layer0 deploy
```

## Layer0 Configuration

This project is configured to use a Layer0 [custom connector](https://docs.layer0.co/guides/connectors).

### `layer0.config.js`

The `layer0.config.js` configuration file specifies the location of the files defining the connector. In this case they are located in the `layer0` directory.

```js
// layer0.config.js

module.exports = {
  connector: './layer0',
}
```

### `dev.js`

Instructions for running Redwood development server through the Layer0 CLI. The `yarn rw dev` command is passed to `createDevServer`.

```js
// layer0/dev.js

const { createDevServer } = require('@layer0/core/dev')

module.exports = function() {
  return createDevServer({
    label: 'Redwood',
    command: () => 'yarn rw dev',

    ready: [/listening on/i],
    filterOutput: line => !line.match(/some pattern/),
  })
}
```

### `build.js`

Instructions for building Redwood's `web` side with the Layer0 CLI. The `yarn rw build` command is passed to `DeploymentBuilder`.

```js
// layer0/build.js

const { DeploymentBuilder } = require('@layer0/core/deploy')
const FrameworkBuildError = require('@layer0/core/errors/FrameworkBuildError')

module.exports = async function build({ skipFramework }) {
  const builder = new DeploymentBuilder()
  builder.clearPreviousBuildOutput()

  if (!skipFramework) {
    try {
      await builder.exec('yarn rw build')
    } catch (e) {
      throw new FrameworkBuildError('Redwood')
    }
  }
  await builder.build()
}
```

### `routes.js`

```js
// routes.js

const { Router } = require('@layer0/core/router')

module.exports = new Router().match(
  '/:path*',
  ({serveStatic}) => {
    serveStatic('web/dist/:path*')
  }
)
```
