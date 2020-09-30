import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

import packageJSON from './package.json'

const NODE_ENV = 'production'
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, '.min.js');

const input = './src/index.js';

const baseCfg= (output, withReplace, withTerser) => {
  let plugins= []
  if (withReplace) {
    plugins.push(
      replace({
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
      })      
    )
  }
  plugins= plugins.concat([
    babel({
      exclude: 'node_modules/**',
      /*https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers*/
      babelHelpers: 'bundled'
    }),
    resolve(),
    commonjs()
  ])
  if (withTerser) {
    plugins.push(
      terser()
    )
  }
  return {
    input: input,
    output: output,
    external: ['react', 'react-dom', 'reactstrap'],
    plugins: plugins  
  }
}

module.exports = [
  //
  // CommonJs
  //
  baseCfg({
    file: packageJSON.main,
    format: 'cjs',
    exports: 'default'
  }, false, false),
  baseCfg({
    file: minifyExtension(packageJSON.main),
    format: 'cjs',
    exports: 'default'
  }, false, true),
  //
  // ES modules
  //
  baseCfg({
    file: packageJSON.module,
    format: 'es',
    exports: 'named'
  }, true, false),
  baseCfg({
    file: minifyExtension(packageJSON.module),
    format: 'es',
    exports: 'named'
  }, true, true),  
  //
  // UMD
  //  
  baseCfg({
    file: packageJSON.browser,
    format: 'umd',
    name: 'ReactstrapDatePicker',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'reactstrap': 'Reactstrap'
    }
  }, true, false),
  baseCfg({
    file: minifyExtension(packageJSON.browser),
    format: 'umd',
    name: 'ReactstrapDatePicker',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'reactstrap': 'Reactstrap'
    }
  }, true, true), 
  
];