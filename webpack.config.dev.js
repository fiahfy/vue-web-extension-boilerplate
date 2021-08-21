const { merge } = require('webpack-merge')
const config = require('./webpack.config')

module.exports = merge(config, {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    background: ['crx-hotreload', './background'],
  },
})
