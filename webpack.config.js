const path = require('path');

module.exports = [];

module.exports = (env) => {
  const isProduction = env === 'production';

  return {
    entry: path.join(__dirname, 'src', 'index.jsx'),
    output: {
      path: path.join(__dirname, 'public', 'js'),
      filename: 'bundle.js'
    },
    mode: 'production',
    target: 'web',
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/
      }]
    },
    devtool: isProduction ? 'source-map' : 'simple-module-eval-source-map',
  };
}
