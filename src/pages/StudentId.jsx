import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import logoImg    from '../assets/images/cyut-logo-words.jpg';       // 校徽 logo
import barcodeImg from '../assets/images/barcode-placeholder.jpg';   // 條碼占位圖
import './StudentId.css';

export default function StudentCard({ userName = '', idNo = '', studentId = '' }) {
  const navigate = useNavigate();

  return (
    <div className="student-card-page">
      {/* Header：顯示系統標題＋姓名、學號＋學生證按鈕 */}
      <Header
        title="朝陽科技大學校園系統"
        userName={userName}
        studentId={studentId}
      />

      <main className="student-card-container">
        <div className="card">
          {/* 校徽 */}
          <img src={logoImg} alt="CYUT Logo" className="card-logo" />

          {/* 標題 */}
          <h2 className="card-title">電子學生證</h2>

          {/* 大頭照 */}
          <div className="photo-frame">
            <img
              // 這裡從 localStorage 拿 url（Login 成功時存入 authPhoto）
              src={localStorage.getItem('authPhoto') || '/student-photo-placeholder.png'}
              alt="學生照片"
              className="student-photo"
            />
          </div>

          {/* 基本資料 */}
          <div className="card-info">
            <p className="student-name">{userName}</p>
            <p className="student-id">學號：{studentId}</p>
            <p className="student-idno">身分證：{idNo}</p>
            {/* 系所／班級固定示範，後面可改成動態 */}
            <p className="student-dept">應用應英系四日—A</p>
          </div>

          {/* 條碼 */}
          <div className="barcode-frame">
            <img src={barcodeImg} alt="barcode" className="barcode-img" />
            <p className="barcode-note">掃碼以驗證學生身份</p>
          </div>
        </div>

        {/* 卡片下方提醒 */}
        <p className="card-footer-note">
          限本人使用，不可塗改或變造；學生在校期間持有為有效，如有違法或不當使用應自負法律責任。
        </p>
      </main>

      <Footer active="/" />
    </div>
  );
}
