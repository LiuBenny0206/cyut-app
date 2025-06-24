// src/pages/Certificate.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import sealImg      from '../assets/images/official-seal.jpg';
import watermarkImg from '../assets/images/cyut-watermark.png';
import './Certificate.css';

export default function Certificate() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // 如果有人直接访问，没有 state 就回上一页
  useEffect(() => {
    if (!state) navigate(-1);
  }, [state, navigate]);

  const {
    userName  = '',
    studentId = '',
    idNo      = '',
    records   = []
  } = state || {};

  // 下面示範用表格第一筆的學年度+學期合成認證學號，序號隨機示例
  const verifyCode = Math.random().toString(36).slice(-10);
  const verifyId   = `${records[0]?.year || '000'}${records[0]?.semester || '0'}`;

  return (
    <div className="cert-page">
      <Header title="" />

      <div className="cert-container">
        <img className="watermark" src={watermarkImg} alt="Watermark" />

        <h2>朝陽科技大學</h2>
        <h3>在學證明書</h3>

        <table className="info-table">
          <tbody>
            <tr>
              <td>學生</td>
              <td colSpan={3}>{userName}</td>
              <td>學號</td>
              <td>{studentId}</td>
            </tr>
            <tr>
              <td>身分證號</td>
              <td colSpan={5}>{idNo}</td>
            </tr>
            <tr>
              <td>系所別</td>
              <td colSpan={5}>
                {records[0]?.dept} {records[0]?.class}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="cert-statement">
          <p>
            上列學生 {records[0]?.year} 學年度第 {records[0]?.semester} 學期目前仍就讀本校。
          </p>
          <p className="mt-4">特此證明</p>
        </div>

        <div className="notes">
          <p>本文件係朝陽科技大學網路列印正式文件，嚴禁偽造、變造或其他方式使用。</p>
          <p>
            如需認證請至認證網址：
            <a
              href="https://cyutis.cyut.edu.tw/TSOtherForStd/EnrLeCht/Verify"
              target="_blank"
              rel="noreferrer"
            >
              https://cyutis.cyut.edu.tw/…/Verify
            </a>
          </p>
        </div>

        {/* 新增：認證資訊 */}
        <div className="verification">
          <div>認證學號：<span>{studentId}</span></div>
          <div>認證序號：<span>{verifyCode}</span></div>
        </div>

        <div className="cert-footer">
          <div className="date">
            中華民國 {new Date().getFullYear() - 1911} 年{' '}
            {new Date().getMonth() + 1} 月 {new Date().getDate()} 日
          </div>
          <img className="seal" src={sealImg} alt="Official Seal" />
        </div>
      </div>

      <Footer active="/" />
    </div>
  );
}
