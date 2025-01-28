import { CleanWebpackPlugin } from "clean-webpack-plugin";

export default {
  entry: {
    main: "./src/js/index.js",
  },
  plugins: [new CleanWebpackPlugin()],

  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
          },
        },
      },
    ],
  },
};
