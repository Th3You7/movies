import path from 'path';
import { fileURLToPath } from 'url';
import common from './webpack.common.js';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common, {
  //setting the mode
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  //using optimization will override the production mode default options
  optimization: {
    minimizer: [
      //uglifying the assets:
      //css
      new CssMinimizerPlugin(),
      //js
      new TerserPlugin(),
      //html
      new HtmlWebpackPlugin({
        //title: give a title
        filename: 'index.html',
        template: './src/template.html',
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },
  plugins: [new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' })],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css file into /dist
          'css-loader', //2. Turns css into commonjs
          'sass-loader', //1. Turns sass into css
        ],
      },
    ],
  },
});
