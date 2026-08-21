const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function setupProxy(app) {
  app.use(
    "/leetcode-graphql",
    createProxyMiddleware({
      target: "https://leetcode.com",
      changeOrigin: true,
      secure: true,
      pathRewrite: { "^/leetcode-graphql": "/graphql" },
      headers: {
        Referer: "https://leetcode.com/",
      },
    })
  );
};
