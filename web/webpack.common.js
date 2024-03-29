const path = require('path');
const fs = require('fs');

const appDirectory = path.resolve(__dirname, '../');
const webDirectory = __dirname;

const HtmlWebpackPlugin = require('html-webpack-plugin');

const librariesData = JSON.parse(
  fs.readFileSync(path.resolve(webDirectory, './libraries.json'), 'utf8'),
);
const libraries = librariesData.map((value) => {
  return path.resolve(appDirectory, 'node_modules', value);
});

module.exports = {
  entry: [path.resolve(webDirectory, 'src/index.web.js')],

  output: {
    filename: 'bundle.web.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        include: [
          path.resolve(webDirectory, 'src/index.web.js'),
          path.resolve(appDirectory, 'src'),
          path.resolve(appDirectory, 'node_modules/react-native'),
          ...libraries,
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-typescript'],
            plugins: [],
          },
        },
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.(html?)$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        include: path.resolve(appDirectory),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(webDirectory, 'src/index.html'),
    }),
  ],
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.web.ts', '.js', '.ts', '.tsx', '.html'],
  },
};
