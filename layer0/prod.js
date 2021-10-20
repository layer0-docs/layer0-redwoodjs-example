module.exports = async function prod(port) {
  process.env.PORT = port.toString()
}