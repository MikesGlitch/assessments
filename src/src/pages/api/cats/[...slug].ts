import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
    api: {
      bodyParser: false, // turning off automatic body parsing for file uploads
    },
  }
  
// Create proxy instance outside of request handler function to avoid unnecessary re-creation
const catProxy = createProxyMiddleware({
    target: 'https://api.thecatapi.com/v1',
    changeOrigin: true,
    pathRewrite: { [`^/api/cats`]: ''},
    secure: false,
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('x-api-key', process.env.CATS_API_KEY);
    }
});

export default catProxy