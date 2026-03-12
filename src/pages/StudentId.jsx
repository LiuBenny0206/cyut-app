import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import logoImg from '../assets/images/cyut-logo-words.jpg';
import barcodeImg from '../assets/images/barcode-placeholder.jpg';
import './StudentId.css';

export default function StudentCard({
  userName = '',
  idNo = '',
  studentId = '',
  photo = '',
  onLogout
}) {
  const photoUrl =
    photo || localStorage.getItem('authPhoto') || '/student-photo-placeholder.png';

  return (
    <div className="student-card-page">
      <Header
        title="朝陽科技大學校園系統"
        userName={userName}
        studentId={studentId}
        onLogout={onLogout}
      />

      <main className="student-card-container">
        <div className="card">
          <img src={logoImg} alt="CYUT Logo" className="card-logo" />

          <h2 className="card-title">電子學生證</h2>

          <div className="photo-frame">
            <img src={photoUrl} alt="學生照片" className="student-photo" />
          </div>

          <div className="card-info">
            <p className="student-name">{userName}</p>
            <p className="student-id">學號：{studentId}</p>
            <p className="student-idno">身分證：{idNo}</p>
            <p className="student-dept">應用應英系四日—A</p>
          </div>

          <div className="barcode-frame">
            <img src={barcodeImg} alt="barcode" className="barcode-img" />
            <p className="barcode-note">掃碼以驗證學生身份</p>
          </div>
        </div>

        <p className="card-footer-note">
          限本人使用，不可塗改或變造；學生在校期間持有為有效，如有違法或不當使用應自負法律責任。
        </p>
      </main>

      <Footer active="/" />
    </div>
  );
}