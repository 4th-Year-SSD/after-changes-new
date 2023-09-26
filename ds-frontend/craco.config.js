const dotenv = require('dotenv').config().parsed

if (dotenv?.error) {
  throw dotenv.error
}
module.exports = {
  plugins: [
    {
      plugin: require('craco-plugin-scoped-css'),
    },
  ],
}
