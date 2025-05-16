import { useEffect, useState } from 'react';
import { getAllNotice } from '../api/notice';
import Header from '../components/Common/Header'; //상단바 헤더 컴포넌트

interface Notice {
  id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
  viewCount: number;
  category: number;
}

const NoticePage = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await getAllNotice({ page: 1, size: 10 });
        setNotices(res.data.content);
      } catch (e) {
        console.error('공지사항 전체 불러오기 실패:', e);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white font-['Noto_Sans_KR']">
      {/* 헤더 */}
      <Header />

      {/* 배경 로고 및 타이틀 영역 */}
      <div className="relative h-[480px] bg-[#0d0d1a] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-end pr-12">
          <img
            src="https://www.suwon.ac.kr/usr/images/suwon/emblem_08_2024_6.png"
            alt="USW 배경 로고"
            className="w-[600px] opacity-10 object-contain"
          />
        </div>

        {/* 공지사항 텍스트 위치 조정 */}
        <div className="relative z-10 text-center pt-60">
          <h1 className="text-5xl font-extrabold">공지사항</h1>
        </div>
      </div>

      {/* 배너 (무한 스크롤) */}
      <div className="bg-[#36366c] overflow-hidden whitespace-nowrap h-20 flex items-center">
        <div className="animate-marquee whitespace-nowrap inline-block">
          <span className="text-4xl font-extrabold text-black pr-20">COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE.</span>
          <span className="text-4xl font-extrabold text-black pr-20">COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE.</span>
          <span className="text-4xl font-extrabold text-black pr-20">COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE.</span>
        </div>
      </div>

      {/* 공지 목록 */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ul className="divide-y divide-gray-600">
          {notices.map(notice => (
            <li key={notice.id} className="py-6 hover:bg-white hover:bg-opacity-10 transition rounded-md px-4">
              <h2 className="text-xl font-semibold mb-1">{notice.title}</h2>
              <p className="text-gray-400 text-sm mb-2">
                작성자: {notice.writer} | 날짜: {notice.createdAt.split('T')[0]}
              </p>
              <p className="text-gray-300 text-sm line-clamp-2">{notice.content}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* marquee 애니메이션 */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 150s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NoticePage;
