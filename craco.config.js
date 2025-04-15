const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.[jt]sx?$/,
        include: path.resolve(__dirname, 'packages'),
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['@babel/preset-typescript', '@babel/preset-react'],
              plugins: ['@babel/plugin-transform-typescript'],
            },
          },
        ],
      });

      return webpackConfig;
    },
  },
};
