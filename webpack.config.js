const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = ({
  mode
} = {
  mode: 'development'
}) => {
  const devMode = mode !== 'production';

  return {
    mode,
    entry: './js/app.js',
    devtool: 'source-map',
    output: {
      filename: devMode ? '[name].js' : '[name].[hash].js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [{
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader?name=images/[name].[ext]'
        },
      ]
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.js'
      },
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: true
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
      }),
      new CopyWebpackPlugin([{
        from: 'images',
        to: 'images'
      }]),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      compress: true
    }
  };
};
