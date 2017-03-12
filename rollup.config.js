import buble from 'rollup-plugin-buble'

export default {
  entry: './src/index.js',
  dest: './dist',
  plugins: [buble()],
  moduleName: 'WASD_Flappy',
  targets: [
    { dest: 'dist/flappy.js', format: 'umd' },
    { dest: 'dist/flappy.common.js', format: 'cjs' },
    { dest: 'dist/flappy.esm.js', format: 'es' }
  ]
}
