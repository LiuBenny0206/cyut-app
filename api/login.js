// api/login.js

export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: '只接受 POST' });
    }
  
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: '缺少帳號或密碼' });
    }
  
    // === 最简单的明文比对，后续再换回 bcrypt/JWT ===
    if (username !== 's10922095' || password !== 'cbai0896') {
      return res.status(401).json({ error: '帳號或密碼錯誤' });
    }
  
    // 模拟签发一个 token（以后再改成真正的 jwt.sign）
    const dummyToken = 'dummy-auth-token';
  
    return res.status(200).json({ token: dummyToken });
  }
  