const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: [
          path.resolve(__dirname, '../../packages/ui'),
          path.resolve(__dirname, '../../packages/design-system'),
          path.resolve(__dirname, '../../packages/utils'),
          path.resolve(__dirname, '../../packages/icon'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      });
      webpackConfig.resolve.alias = {
        ...(webpackConfig.resolve.alias || {}),
        '@': path.resolve(__dirname, 'src'),
      };
      return webpackConfig;
    },
  },
};
