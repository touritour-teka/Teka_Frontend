const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const iconPath = path.resolve(__dirname, '../../packages/icon');
      const hooksPath = path.resolve(__dirname, '../../packages/hooks');

      webpackConfig.module.rules.push({
        test: /\.[jt]sx?$/,
        include: [path.resolve(__dirname, 'src'), iconPath, hooksPath],
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                '@babel/preset-typescript',
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
            },
          },
        ],
      });
      webpackConfig.module.rules.push({
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [/node_modules\/react-datepicker/],
      });

      return webpackConfig;
    },
  },
};
