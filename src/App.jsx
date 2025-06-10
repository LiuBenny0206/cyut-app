// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home  from './pages/Home';
import Login from './pages/Login';

export default function App() {
  // 1. 用 state 保存 token
  const [token, setToken] = useState(null);

  // 2. 组件加载时，从 localStorage 读取
  useEffect(() => {
    const t = localStorage.getItem('authToken');
    if (t) setToken(t);
  }, []);

  // 3. 提供一个函数给 Login 修改 token
  const handleLogin = (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* 4. 根路由判断 token 是否存在 */}
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to="/login" replace />}
        />
        {/* 5. 把 handleLogin 传给 Login，让它登录后调用 */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}
