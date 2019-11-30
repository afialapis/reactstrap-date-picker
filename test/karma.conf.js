//const path = require('path')

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'], /*'Firefox',*/
        failOnEmptyTestSuite: false,
        singleRun: true,
        frameworks: ['mocha'],
        plugins: [
          'karma-firefox-launcher',
          'karma-chrome-launcher',
          'karma-mocha',
          'karma-sourcemap-loader',
          'karma-webpack',
        ],        
        files: [
            'tests.bundle.js'
        ],
        preprocessors: {
            'tests.bundle.js': ['webpack']
        },
        reporters: ['dots'],
        webpack: {
          mode: 'development',
          resolve: {
            extensions: ['.js']
          },
          devtool: 'inline-source-map',
          module: {
            rules: [
              {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|lib|dist|example)/,
                /*include: [
                  path.join(__dirname, 'src')
                ],*/
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
              }
            ]
          }
        }, 
        webpackMiddleware: {
          noInfo: true
        },
        webpackServer: {
          noInfo: true
        }
    });
};