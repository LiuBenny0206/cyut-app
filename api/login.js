// api/login.js
module.exports = function handler(req, res) {
  console.log('🔍 Checking API login:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只接受 POST' });
  }
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: '缺少帳號或密碼' });
  }

  // 帳號、密碼、姓名、身分證字號、校內學號、照片對照
  const USERS = {
    's10922095': {
      pwd:      'cbai0896',
      name:     '劉秉彥',
      idNo:     'B123550425',
      schoolId: '10922095',
      photo:    '/photos/s10922095.jpg'    // 对应 public/photos/s10922095.jpg
    },
    's10922080': {
      pwd:      'Cc910819',
      name:     '董旻辰',
      idNo:     'H225749722',
      schoolId: '10922080',
      photo:    '/photos/s10922080.jpg'
    },
    // …以后再继续新增更多用户…
  };

  const user = USERS[username];
  console.log('→ lookup user:', user);

  if (!user || user.pwd !== password) {
    return res.status(401).json({ error: '帳號或密碼錯誤' });
  }

  // 認證成功，回傳 token + name + idNo + schoolId + photo
  return res.status(200).json({
    token:    'dummy-auth-token',
    name:     user.name,
    idNo:     user.idNo,
    schoolId: user.schoolId,
    photo:    user.photo
  });
};
