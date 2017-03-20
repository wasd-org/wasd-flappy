import buble from 'rollup-plugin-buble'

export default {
  entry: './src/index.js',
  plugins: [buble()],
  moduleName: 'WASD_Flappy',
  banner: '/*!\n' +
  ' * (c) 2016-' + new Date().getFullYear() + ' WASD-ORG\n' +
  ' * Released under the MIT License.\n' +
  ' */',
  targets: [
    { dest: 'dist/flappy.js', format: 'umd' },
    { dest: 'dist/flappy.common.js', format: 'cjs' },
    { dest: 'dist/flappy.esm.js', format: 'es' }
  ]
}
