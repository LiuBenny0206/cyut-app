// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home        from './pages/Home';
import Login       from './pages/Login';
import Proof       from './pages/Proof';
import Certificate from './pages/Certificate';
import StudentCard from './pages/StudentId'; // 确保文件名/组件名一致

export default function App() {
  // 1. 用 state 保存 token、用户名、身分證號 和 學號
  const [token,     setToken]     = useState(null);
  const [userName,  setUserName]  = useState('');
  const [idNo,      setIdNo]      = useState('');
  const [studentId, setStudentId] = useState('');

  // 2. 组件加载时，从 localStorage 读取
  useEffect(() => {
    const t = localStorage.getItem('authToken');
    const u = localStorage.getItem('authUser')     || '';
    const i = localStorage.getItem('authIdNo')     || '';
    const s = localStorage.getItem('authSchoolId') || '';
    if (t) {
      setToken(t);
      setUserName(u);
      setIdNo(i);
      setStudentId(s);
    }
  }, []);

  // 3. 登录成功后将调用此函数，更新 state & localStorage
  const handleLogin = (newToken, newName, newIdNo, newSchoolId) => {
    localStorage.setItem('authToken',    newToken);
    localStorage.setItem('authUser',     newName);
    localStorage.setItem('authIdNo',     newIdNo);
    localStorage.setItem('authSchoolId', newSchoolId);

    setToken(newToken);
    setUserName(newName);
    setIdNo(newIdNo);
    setStudentId(newSchoolId);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* 根路由：有 token 才能看 Home，否則跳到 /login */}
        <Route
          path="/"
          element={
            token
              ? <Home userName={userName} studentId={studentId} />
              : <Navigate to="/login" replace />
          }
        />

        {/* 在學證明頁 */}
        <Route
          path="/proof"
          element={
            token
              ? <Proof userName={userName} studentId={studentId} />
              : <Navigate to="/login" replace />
          }
        />

        {/* 登录页 */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        {/* 列印證明書頁 */}
        <Route
          path="/certificate"
          element={
            token
              ? <Certificate />
              : <Navigate to="/login" replace />
          }
        />

        {/* 電子學生證頁 */}
        <Route
          path="/student-card"
          element={
            token
              ? <StudentCard
                  userName={userName}
                  idNo={idNo}
                  studentId={studentId}
                />
              : <Navigate to="/login" replace />
          }
        />

        {/* 其他未定義路由一律導回根路由（或 /login） */}
        <Route
          path="*"
          element={<Navigate to={token ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
