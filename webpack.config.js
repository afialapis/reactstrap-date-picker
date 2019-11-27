const webpack = require('webpack')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  //new BundleAnalyzerPlugin({reportFileName: 'webpack_report.html'}),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: 'bundle.css',
    allChunks: true
  }),   
]

const filename = env === 'production'
  ? 'valium-reactstrap.min.js'
  : 'valium-reactstrap.js'

module.exports = {
  mode: env,
  context: path.join(__dirname, 'src'),
  entry: [
    './index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: filename,
  },
  target: 'node',
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src')
        ],
        query: {
          cacheDirectory: false,
          presets: [
            ['@babel/preset-env', {targets: {esmodules: true}}],
            '@babel/preset-react'],
          plugins: [
            // Stage 3
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-object-rest-spread',
            // ["module:fast-async"]
          ]
        }
      },
      {
        test: /\.(css|scss)(\?.+)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },
  optimization: {
    minimizer: [  new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6,
      },
    }),]
  } 
}
