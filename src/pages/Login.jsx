import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    // 模擬驗證
    if (user === 'student' && pwd === 'password') {
      navigate('/');
    } else {
      alert('帳密錯誤');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white p-6 rounded shadow">
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
        <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
          登入
        </button>
      </form>
    </div>
  );
}
