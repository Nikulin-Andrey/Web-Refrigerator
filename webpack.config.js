const path =  require('path');
require('babel-polyfill');

module.exports = {
    entry: ['babel-polyfill','./src/index.js'], 
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    mode:'production',
    module: {
        rules: [
           {
              test: /\.js$/,
              include: path.resolve(__dirname, 'src'),
              loader: 'babel-loader'
           }
        ]
     }
}