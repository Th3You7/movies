import path from 'path';
import { fileURLToPath } from 'url';
import common from './webpack.common.js';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { merge } from 'webpack-merge';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common, {
  //setting the mode
  mode: 'development',
  //using sourcemap, actually there are multiple options
  devtool: 'eval-cheap-module-source-map',

  //setting the webpack dev server options
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    static: './dist',
    //updating without reloading
    hot: true,
    compress: true,
    port: 9000,
    watchFiles: ['src/**/*'],
    //writeToDisk: true,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    pathinfo: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // my src html template
      template: './src/html/index.html',
    }),
    new ESLintWebpackPlugin({
      overrideConfigFile: 'eslint.config.mjs',
      configType: 'flat',
      extensions: ['js', 'mjs'],
      emitWarning: true,
    }),
  ],
  module: {
    rules: [
      {
        //here I dont split my css cause it consumes much time while developing
        test: /\.scss$/,
        use: [
          'style-loader', //3. Inject styles into DOM
          'css-loader', //2. Turns css into commonjs
          'sass-loader', //1. Turns sass into css
        ],
      },
    ],
  },
});
