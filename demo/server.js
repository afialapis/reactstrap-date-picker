// Enable ES2018 support
require('@babel/register')

const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('./webpack.config')

const port = process.env.PORT || 3002

const server = new WebpackDevServer(webpack(config), {
  contentBase: 'demo',
  stats: {
    colors: true,
  },
})

server.listen(port, function() {})
