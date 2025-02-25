var winston = require('winston'); //(1)

function logProvider() { //(2)
  return winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.simple()
    ),
    transports: [new winston.transports.Console()],
  });
}
var PROXY_CONF = [
  {
    context: ["/api/**"],
    target: 'http://localhost:8090',
    secure: false,
    changeOrigin: false,
    logLevel: 'debug',
    logProvider: logProvider,
    cookiePathRewrite: '/local/'/*,
    pathRewrite: {
      '^/api': '/api',
    },*/
  }
];

module.exports = PROXY_CONF;
/*var PROXY_CONF = {
  '/api/!*': {
    target: 'http://localhost:8090',
    secure: false,
    changeOrigin: false,
    logLevel: 'debug',
    // logProvider: logProvider, // (3) replace this with
    configure: (proxy, _options) => {
      proxy.on("error", (err, _req, _res) => {
        console.log("proxy error", err);
      });
      proxy.on("proxyReq", (proxyReq, req, _res) => {
        const headers = proxyReq.getHeaders();
        // console.log(headers);
        console.log(
          req.method,
          req.url,
          " -> ",
          `${headers.host}${proxyReq.path}`,
        );
      });
      proxy.on("proxyRes", (proxyRes, req, _res) => {
        console.log(
          req.method,
          "Target Response",
          proxyRes.statusCode,
          ":",
          req.url,
        );
      });
    },
    /!*cookiePathRewrite: '/api/',*!/
    pathRewrite: {
      '^/api': '/api',
    },
  },
};

module.exports = PROXY_CONF;*/
