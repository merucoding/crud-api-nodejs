const path = require('path');

module.exports = {
  mode: 'production',
  entry: './dist/app.js',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js'],
  },
};