// server.js
const express    = require('express');
const bodyParser = require('body-parser');

// 直接复用你的 api/login.js 逻辑（已改成 CommonJS 导出）
const loginHandler = require('./api/login');

const app = express();

// 解析 JSON body
app.use(bodyParser.json());

// 1 个路由： POST /api/login
app.post('/api/login', (req, res) => {
  console.log('✅ [login] received:', req.method, req.url, req.body);
  return loginHandler(req, res);
});

// （生产环境可以解开下面这一行来服务 build）
// const path = require('path');
// app.use(express.static(path.join(__dirname, 'build')));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🔐 API server listening on http://localhost:${PORT}`);
});
