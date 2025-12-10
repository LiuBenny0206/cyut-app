// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import sirenIcon        from '../assets/images/siren.png';
import writeLetterIcon  from '../assets/images/write-letter.png';
import admissionIcon    from '../assets/images/admission.png';
import profileIcon      from '../assets/images/student-card.png';
import schoolActiveIcon from '../assets/images/active-learning.png';
import emailIcon        from '../assets/images/email.png';
import calendarIcon     from '../assets/images/calendar.png';
import schoolIcon       from '../assets/images/campus.png';
import careIcon         from '../assets/images/medical-book.png';

export default function Home({ userName = '', studentId = '', onLogout }) {
  const navigate = useNavigate();

  const menuItems = [
    // 內部路由
    { label: '緊急事件通報', path: '/emergency', icon: sirenIcon },
    { label: '在學證明',     path: '/proof',     icon: writeLetterIcon },

    // 外部連結：標記 external: true
    {
      label: '招生訊息',
      path:  'https://acad.cyut.edu.tw/p/426-1002-6.php?Lang=zh-tw',
      icon:  admissionIcon,
      external: true,
    },
    {
      label: '校園活動',
      path:  'https://icsc.cyut.edu.tw/p/403-1008-1002-1.php?Lang=zh-tw',
      icon:  schoolActiveIcon,
      external: true,
    },
    {
      label: '校園通訊錄',
      path:  'https://www.cyut.edu.tw/cyut_new/admin.php',
      icon:  emailIcon,
      external: true,
    },
    {
      label: '校園行事曆',
      path:  'https://acad.cyut.edu.tw/p/412-1002-2368.php?Lang=zh-tw',
      icon:  calendarIcon,
      external: true,
    },
    {
      label: '校園安全',
      path:  'https://stafof.cyut.edu.tw/p/412-1003-7371.php?Lang=zh-tw',
      icon:  schoolIcon,
      external: true,
    },
    {
      label: '學生全程關懷手冊',
      path:  'https://stafof.cyut.edu.tw/p/404-1003-30613.php?Lang=zh-tw',
      icon:  careIcon,
      external: true,
    },

    // 內部路由
    { label: '學生資訊系統', path: '/sis',      icon: profileIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header
        userName={userName || localStorage.getItem('authUser') || ''}
        studentId={studentId || localStorage.getItem('authSchoolId') || ''}
        onLogout={onLogout}
      />

      <main className="p-2 flex-1">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {menuItems.map((item, idx) => {
            const isEmergency = item.path === '/emergency';
            const baseClasses = `flex flex-col items-center justify-center ${
              isEmergency ? 'bg-red-200' : 'bg-blue-50'
            } h-28 rounded-lg shadow`;

            // 外部連結使用 <a> 開新分頁
            if (item.external) {
              return (
                <a
                  key={idx}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={baseClasses}
                >
                  <img src={item.icon} alt={item.label} className="w-10 h-10 mb-1" />
                  <span className={`text-sm ${isEmergency ? 'text-red-700' : 'text-blue-800'}`}>
                    {item.label}
                  </span>
                </a>
              );
            }

            // 內部路由使用 navigate()
            return (
              <button
                key={idx}
                onClick={() => navigate(item.path)}
                className={baseClasses}
              >
                <img src={item.icon} alt={item.label} className="w-10 h-10 mb-1" />
                <span className={`text-sm ${isEmergency ? 'text-red-700' : 'text-blue-800'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </main>

      <Footer active="/" />
    </div>
  );
}
