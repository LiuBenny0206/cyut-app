// src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import idCardIcon from '../assets/images/id-card.png';

export default function Header({
  title     = '朝陽科技大學校園系統',
  userName  = '',
  studentId = '',
  onLogout,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate('/login');
    }
  };

  return (
    <header className="bg-blue-800 text-white flex items-center justify-between px-4 h-12">
      {/* 左侧标题 */}
      <h1 className="text-lg font-medium">{title}</h1>

      {/* 右侧：学号、姓名、图标 */}
      {userName && (
        <div className="flex items-center space-x-3">
          <span>{userName} 您好</span>
          <button
            onClick={() => navigate('/student-card')}
            aria-label="學生證"
            className="focus:outline-none"
          >
            <img src={idCardIcon} alt="學生證" className="w-6 h-6" />
          </button>
          {onLogout && (
            <button
              onClick={handleLogout}
              className="text-sm bg-white/10 border border-white/30 rounded px-2 py-1 hover:bg-white/20"
            >
              登出
            </button>
          )}
        </div>
      )}
    </header>
  );
}
