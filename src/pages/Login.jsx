// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate }      from 'react-router-dom';

export default function Login({ onLogin }) {
  const [user, setUser] = useState('');
  const [pwd,  setPwd ] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 发请求到本地 Express（或生产时的 /api/login）
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.trim(), password: pwd }),
      });

      const data = await res.json();

      if (!res.ok) {
        // 后端返回 401 或 400 时，会在 data.error 里
        throw new Error(data.error || '登入失敗');
      }

      // 拿到 token 存储
      localStorage.setItem('authToken', data.token);
      // 通知父组件更新登录状态
      if (onLogin) onLogin(data.token);
      // 跳转到首页
      navigate('/');
    } catch (err) {
      // 调试看请求和响应
      console.error('[Login] error:', err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4 text-center">校務系統登入</h1>
        <input
          type="text"
          placeholder="學號或教職員ID"
          value={user}
          onChange={e => setUser(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring"
          required
        />
        <input
          type="password"
          placeholder="密碼"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring"
          required
        />
        <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
          登入
        </button>
      </form>
    </div>
  );
}
