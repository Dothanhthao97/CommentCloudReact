const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api-social",
    createProxyMiddleware({
      target: "https://dpmclouddev.vuthao.com",
      changeOrigin: true,
      secure: true,
    })
  );
};
