// src/components/Footer.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import newsIcon    from '../assets/images/newspaper-folded.png';
import homeIcon    from '../assets/images/home.png';
import libraryIcon from '../assets/images/open-book.png';
import busIcon     from '../assets/images/bus.png';
import cyutIcon    from '../assets/images/cyut-logo.png';

const navItems = [
  { label: '最新消息', path: '/news',    icon: newsIcon },
  { label: '圖書館',   path: '/library', icon: libraryIcon },
  { label: '首頁',     path: '/',        icon: homeIcon },
  { label: '交通指引', path: '/transit', icon: busIcon },
  { label: '認識朝陽', path: '/about',   icon: cyutIcon },
];

export default function Footer({ active = '/' }) {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t h-14 flex justify-around items-center">
      {navItems.map((nav) => {
        const isActive = active === nav.path;
        return (
          <button
            key={nav.path}
            onClick={() => navigate(nav.path)}
            className={`flex flex-col items-center text-xs ${
              isActive ? 'text-blue-800' : 'text-gray-600'
            }`}
          >
            <img
              src={nav.icon}
              alt={nav.label}
              className={`w-6 h-6 mb-1 ${
                isActive ? 'filter brightness-100' : 'filter brightness-50'
              }`}
            />
            {nav.label}
          </button>
        );
      })}
    </footer>
  );
}
