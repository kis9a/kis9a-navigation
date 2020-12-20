const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminWebp = require("imagemin-webp-webpack-plugin");
const ImageminMozJpeg = require("imagemin-mozjpeg");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  pwa: {
    workboxOptions: {
      skipWaiting: true,
    },
  },
  chainWebpack(config) {
    config.plugin("ImageminWebp").use(ImageminWebp, [
      {
        test: /\.(jpg|png)$/i,
        option: {
          quality: 90,
        },
      },
    ]);

    config.plugin("ImageminPlugin").use(ImageminPlugin, [
      {
        test: /\.(jpg|png)$/i,
        disable: process.env.NODE_ENV !== "production",
        pngquant: {
          quality: "90",
        },
        plugins: [
          new BundleAnalyzerPlugin(),
          ImageminMozJpeg({
            quality: 90,
            progressive: true,
          }),
        ],
      },
    ]);
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  }
};
