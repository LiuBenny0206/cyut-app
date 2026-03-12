// src/pages/Proof.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Proof({ userName: propName, studentId: propId }) {
  const navigate = useNavigate();

  const userName = propName || localStorage.getItem('authUser') || '';
  const studentId = propId || localStorage.getItem('authSchoolId') || '';
  const idNo = localStorage.getItem('authIdNo') || '';

  // 自動判斷學期：
  // 9/1 ~ 2/20 => 1
  // 其餘 => 2
  const getSemester = () => {
    const today = new Date();
    const month = today.getMonth() + 1; // 1~12
    const day = today.getDate();

    const isSemester1 =
      (month >= 9 && month <= 12) ||
      month === 1 ||
      (month === 2 && day <= 20);

    return isSemester1 ? '1' : '2';
  };

  // 自動判斷學年度（民國年）
  // 規則：
  // 9/1 起進入新學年度
  // 例如：
  // 2025/9/1 ~ 2026/8/31 => 114學年度
  const getSchoolYear = () => {
    const today = new Date();
    const adYear = today.getFullYear(); // 西元年
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const hasEnteredNewSchoolYear =
      month > 9 || (month === 9 && day >= 1);

    const schoolStartYear = hasEnteredNewSchoolYear ? adYear : adYear - 1;

    return String(schoolStartYear - 1911); // 轉民國年
  };

  const baseRecords = [
    {
      year: getSchoolYear(),
      semester: getSemester(),
      dept: '應英系',
      class: '應英系四日—A',
      status: '目前仍在學',
    },
  ];

  const records = baseRecords.map((r) => {
    const suffix = studentId.slice(-2);
    if (suffix === '80') {
      return { ...r, class: r.class.replace('—A', '—B') };
    }
    return r;
  });

  // 列印時導航
  const handlePrint = () => {
    navigate('/certificate', { state: { userName, studentId, idNo, records } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header userName={userName} studentId={studentId} />

      <main className="flex-1 p-4">
        {/* 學號 & 姓名 */}
        <div className="bg-white rounded shadow p-4 mb-4 flex items-center justify-between">
          <div className="text-lg">
            <span className="font-medium mr-4">學號：{studentId}</span>
            <span className="font-medium">姓名：{userName}</span>
          </div>
        </div>

        {/* 表格 */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-center border-collapse">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="px-4 py-2">學年度</th>
                <th className="px-4 py-2">學期</th>
                <th className="px-4 py-2">系所</th>
                <th className="px-4 py-2">班別</th>
                <th className="px-4 py-2">在學狀態</th>
                <th className="px-4 py-2">在學證明</th>
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
                  <td className="px-4 py-2">
                    <button
                      onClick={handlePrint}
                      className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 text-sm"
                    >
                      列印
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 注意事項 */}
        <div className="mt-6 bg-white rounded shadow p-4 text-sm">
          <h2 className="font-medium mb-2">注意事項：</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>限申請「在學證明」，僅供在學證明使用。</li>
            <li>
              行政列印時間以空白日後依行政作業開放；如需校訂更改後，請至「行政大樓櫃台」及「學生事務處」分機申辦「證明書事宜」。
            </li>
            <li>本文件為正式文件，如需重新修改，將依本校學生獎懲規定辦理。</li>
          </ol>
        </div>
      </main>

      <Footer active="/proof" />
    </div>
  );
}