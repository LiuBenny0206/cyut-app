
// api/login.js

module.exports = function handler(req, res) {
  // 只接受 POST 請求
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: '只接受 POST'
    });
  }

  const { username, password } = req.body || {};

  // 檢查帳號與密碼
  if (typeof username !== 'string' ||
      typeof password !== 'string' ||
      !username.trim() ||
      !password) {
    return res.status(400).json({
      error: '缺少帳號或密碼'
    });
  }

  // 帳號統一轉成小寫，並移除前後空白
  let account = username.trim().toLowerCase();

  // 允許輸入純學號，例如 10922095
  if (/^\d+$/.test(account)) {
    account = 's' + account;
  }

  // 學生帳號資料（僅供本機測試）
  const USERS = {
    's10922095': {
      pwd: 'cbai0896',
      name: '劉秉彥',
      idNo: 'B123550425',
      schoolId: '10922095',
      photo: '/photos/s10922095.jpg'
    },
    's10922047': {
      pwd: 'Jmw32812450',
      name: '江泯葳',
      idNo: 'H225607961',
      schoolId: '10922047',
      photo: '/photos/s10922047.jpg'
    },
    's10922096': {
      pwd: 'Qaz123456',
      name: '胡詔銓',
      idNo: 'B123739828',
      schoolId: '10922096',
      photo: '/photos/s10922096.jpg'
    },

    's10922080': {
      pwd: 'Cc910819',
      name: '董旻辰',
      idNo: 'H225749722',
      schoolId: '10922080',
      photo: '/photos/s10922080.jpg'
    }
  };

  // 尋找帳號
  const user = USERS[account];

  // 安全的登入診斷：不記錄密碼及個人資料
  console.log('[Login] 檢查結果:', {
    accountExists: Boolean(user),
    passwordMatches: user
      ? user.pwd === password
      : false
  });

  // 帳號不存在或密碼錯誤
  if (!user || user.pwd !== password) {
    return res.status(401).json({
      error: '帳號或密碼錯誤'
    });
  }

  // 登入成功
  console.log('[Login] 登入成功');

  return res.status(200).json({
    token: 'dummy-auth-token',
    name: user.name,
    idNo: user.idNo,
    schoolId: user.schoolId,
    photo: user.photo
  });
};
