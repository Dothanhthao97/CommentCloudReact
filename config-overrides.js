const webpack = require('webpack');

module.exports = {
  webpack: function (config) {
    // Thêm fallback cho `global` và `setImmediate`
    config.resolve.fallback = {
      global: require.resolve('node-libs-browser/mock/global'),
      setImmediate: require.resolve('timers-browserify'),
    };

    // Thêm polyfill cho `process` nếu cần
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
      })
    );

    return config;
  },
};
