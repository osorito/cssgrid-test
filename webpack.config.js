const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry: './src/js/app.js',//This is where i put all my imports
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[contenthash].js',
  
  },
  // devServer: {
  //   open: true
  // },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  { useBuiltIns: 'usage', corejs: { version: 3 } }
                  //dont forget this line in package.json
                  // "browserslist":">0.3%, not dead",
                ]
              ]
            }
          }
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true,
                
              },
            },
            'css-loader',
          ],
        },
        {
            test: /\.(jpg|png)$/,
            use: [{
                    loader:'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath:'img',
                        publicPath:'img'
                    }
                  }
                ]
        }
    ]
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template:'./src/index.html',
        inject:false
        }), 
    new MiniCssExtractPlugin({
      filename:'css/[contenthash].css'
    })
  ]
};