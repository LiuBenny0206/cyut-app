// src/pages/Proof.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Proof({ userName: propName, studentId: propId }) {
  const navigate = useNavigate();

  // 1. 从 props 或 localStorage 取得使用者姓名、學號、身分證號
  const userName  = propName   || localStorage.getItem('authUser')   || '';
  const studentId = propId     || localStorage.getItem('authSchoolId') || '';
  const idNo      = localStorage.getItem('authIdNo') || '';

  // 2. 静态示范记录（以后可替换成从后端拉）
  const baseRecords = [
    {
      year:     '113',
      semester: '2',
      dept:     '應英系',
      class:    '應英系四日—A', // 默认 A 班
      status:   '目前仍在學',
    },
    // …如有更多记录可继续添加…
  ];

  // 3. 如果学号末两位是 "80"，就把 A 班 改成 B 班
  const records = baseRecords.map(r => {
    const suffix = studentId.slice(-2);
    if (suffix === '80') {
      return { ...r, class: r.class.replace('—A', '—B') };
    }
    return r;
  });

  // 4. 点击「列印」时，导航到 /certificate 并带上正确的 state
  const handlePrint = () => {
    navigate('/certificate', {
      state: { userName, studentId, idNo, records }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* 顶部 Header：显示「姓名」和「學號」 */}
      <Header userName={userName} studentId={studentId} />

      <main className="flex-1 p-4">
        {/* 学号 & 姓名 区块 */}
        <div className="bg-white rounded shadow p-4 mb-4 flex items-center justify-between">
          <div className="text-lg">
            <span className="font-medium mr-2">學號：</span>
            <span>{studentId}</span>
            <span className="font-medium mx-4">姓名：</span>
            <span>{userName}</span>
          </div>
          <button
            onClick={handlePrint}
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            列印
          </button>
        </div>

        {/* 在學證明表格 */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-center border-collapse">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-4 py-2">學年度</th>
                <th className="px-4 py-2">學期</th>
                <th className="px-4 py-2">系所</th>
                <th className="px-4 py-2">班別</th>
                <th className="px-4 py-2">在學狀態</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, idx) => (
                <tr key={idx} className="even:bg-gray-50">
                  <td className="px-4 py-2">{r.year}</td>
                  <td className="px-4 py-2">{r.semester}</td>
                  <td className="px-4 py-2">{r.dept}</td>
                  <td className="px-4 py-2">{r.class}</td>
                  <td className="px-4 py-2">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 注意事項 */}
        <div className="mt-6 bg-white rounded shadow p-4">
          <h2 className="font-medium mb-2">注意事項：</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>限申請「在學證明」，僅供在學證明使用。</li>
            <li>行政列印時間以空白日後依行政作業開放；如需校訂更改後，請至「行政大樓櫃台」及「學生事務處」分機申辦「證明書事宜」。</li>
            <li>本文件為正式文件，如需重新修改，將依本校學生獎懲規定辦理。</li>
          </ol>
        </div>
      </main>

      {/* 底部 Footer，高亮 /proof */}
      <Footer active="/proof" />
    </div>
  );
}
