// api/login.js
module.exports = function handler(req, res) {
    console.log('🔍 Checking API login');
    if (req.method !== 'POST') {
      return res.status(405).json({ error: '只接受 POST' });
    }
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: '缺少帳號或密碼' });
    }
    if (username !== 's10922095' || password !== 'cbai0896') {
      return res.status(401).json({ error: '帳號或密碼錯誤' });
    }
    return res.status(200).json({ token: 'dummy-auth-token' });
  };
  