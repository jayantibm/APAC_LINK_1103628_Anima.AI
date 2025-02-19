const path = require('path');

module.exports = {
  entry: './index.web.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
  },
  devServer: {
    static: './dist',
    port: 8081, // Change port if needed
  },
};
