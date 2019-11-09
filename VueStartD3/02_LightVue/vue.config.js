module.exports = {
  publicPath: "./",
  filenameHashing: false,
  css: {
    extract: {
      filename: `${process.env.APP_NAME}-${process.env.APP_VERSION}.css`
    }
  },
  configureWebpack: {
    output: {
      filename: `${process.env.APP_NAME}-${process.env.APP_VERSION}.js`
    },
    optimization: {
      splitChunks: false
    }
  },
  filenameHashing: false,
  productionSourceMap: false
};
