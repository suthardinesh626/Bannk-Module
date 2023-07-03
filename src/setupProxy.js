const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    'https://172.105.42.161:3020', 
    createProxyMiddleware({
      target: 'http://172.105.42.161:3020', 
      changeOrigin: true,
      secure: false,
    })
  );
};
