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
      const API = process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000'
        : '';

      const res = await fetch(`${API}/api/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ username: user.trim(), password: pwd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '登入失敗');

      // 存 token、真名、身分證字號、校內學號、photo URL
      localStorage.setItem('authToken',    data.token);
      localStorage.setItem('authUser',     data.name);
      localStorage.setItem('authIdNo',     data.idNo);
      localStorage.setItem('authSchoolId', data.schoolId);
      localStorage.setItem('authPhoto',    data.photo);

      // 通知父組件 更新 state
      // （请确保 App.jsx 的 handleLogin 也接收并处理 photo）
      onLogin?.(data.token, data.name, data.idNo, data.schoolId, data.photo);

      // 跳去首頁
      navigate('/');
    } catch (err) {
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
