import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import nodePolyfills from 'rollup-plugin-node-polyfills'

const NODE_ENV = 'development'

export default {
  input: 'test/test_01.js',
  output: {
    file: 'test/bundle.js',
    format: 'umd',
    name: 'ReactstrapDatePicker',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-dom/test-utils': 'TestUtils',
      'reactstrap': 'Reactstrap',
      /*'es6-promise': 'ES6Promise',
      'co': 'co'*/
    }
  },
  plugins: [
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    babel({
      exclude: 'node_modules/**',
      /*https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers*/
      babelHelpers: 'bundled'
    }),
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(/*{
      esmExternals: ['es6-promise']
    }*/),
    nodePolyfills()
  ]
}
