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