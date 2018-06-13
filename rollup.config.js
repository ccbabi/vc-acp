import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import VuePlugin from 'rollup-plugin-vue'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import { uglify } from 'rollup-plugin-uglify'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default {
  input: 'src/index.js',
  output: {
    name: 'vc-acp',
    file: 'dist/vc-acp.js',
    format: 'umd'
  },
  plugins: [
    resolve(),
    commonjs(),
    VuePlugin(),
    postcss({
      extract: 'dist/vc-acp.css',
      inject: false,
      plugins: [
        autoprefixer(),
        cssnano()
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    babel(),
    uglify()
  ]
}
