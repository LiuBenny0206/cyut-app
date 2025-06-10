// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const menuItems = [
    { label: '緊急事件通報', path: '/emergency',    isEmergency: true },
    { label: '在學證明',     path: '/proof' },
    { label: '招生訊息',     path: '/admission' },
    { label: '學生資訊系統', path: '/sis' },
    { label: '校園活動',     path: '/activities' },
    { label: '校園通訊錄',   path: '/directory' },
    { label: '校園行事曆',   path: '/calendar' },
    { label: '校園安全',     path: '/safety' },
    { label: '學生全程關懷手冊', path: '/handbook' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-800 text-white flex items-center justify-between px-4 h-12">
        <h1 className="text-lg font-medium">CYUT 校園系統</h1>
        <button onClick={() => navigate('/settings')}>
          ⚙️
        </button>
      </header>

      {/* Grid Menu */}
      <main className="p-2 flex-1">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center
                ${item.isEmergency ? 'bg-red-200' : 'bg-blue-50'}
                h-28 rounded-lg shadow`}
            >
              {/* 圓形佔位符 */}
              <div
                className={`w-10 h-10 mb-1 rounded-full
                  ${item.isEmergency ? 'bg-red-400' : 'bg-gray-300'}`}
              />
              <span className={`${item.isEmergency ? 'text-red-700' : 'text-blue-800'} text-sm`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="bg-white border-t h-14 flex justify-around items-center">
        {[
          { label: '最新消息', path: '/news',      icon: '📢' },
          { label: '圖書館',   path: '/library',   icon: '📚' },
          { label: '首頁',     path: '/',         icon: '🏠', active: true },
          { label: '交通指引', path: '/transit',   icon: '🚌' },
          { label: '認識朝陽', path: '/about',     icon: '🌄' },
        ].map((nav, i) => (
          <button
            key={i}
            onClick={() => navigate(nav.path)}
            className={`flex flex-col items-center justify-center text-xs
              ${nav.active ? 'text-blue-800' : 'text-gray-600'}`}
          >
            <span className="text-xl">{nav.icon}</span>
            {nav.label}
          </button>
        ))}
      </footer>
    </div>
  );
}
