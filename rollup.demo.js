import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const NODE_ENV = 'development'

export default {
  input: 'demo/src/demo.js',
  output: {
    file: 'demo/dist/bundle.js',
    format: 'umd',
    name: 'ReactstrapDatePicker',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'prop-types': 'PropTypes',
      'reactstrap': 'Reactstrap'
    }
  },
  external: ['react', 'react-dom', 'prop-types', 'reactstrap'],
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
    resolve(),
    commonjs(),
    postcss({
      extract: 'bundle.css'
    }),
    serve({
      contentBase: './demo',
      host: 'localhost',
      port: 3010,      
    }),
    
    livereload({
      watch: 'src',
      port: 3011,
      verbose: true,
      delay: 700
    })
  ]
}