import { useEffect, useState } from 'react';
import { getAllNotice, getCategoryNotice } from '../api/notice';
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

const categories = [
  { label: '전체', value: 'all' },
  { label: '학부', value: '2' },
  { label: '대학원', value: '3' },
  { label: '취업', value: '1' },
];

const NoticePage = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const fetchNotices = async () => {
    try {
      const res =
        selectedCategory === 'all'
          ? await getAllNotice({ page: 1, size: 10 })
          : await getCategoryNotice({ page: 1, size: 10, category: Number(selectedCategory) });

      setNotices(res.data.content);
    } catch (e) {
      console.error('공지사항 불러오기 실패:', e);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white font-['Noto_Sans_KR']">
      {/* 헤더 */}
      <Header />

      {/* 타이틀 영역 */}
      <div className="relative h-[480px] bg-[#0d0d1a] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-end pr-12">
          <img
            src="https://www.suwon.ac.kr/usr/images/suwon/emblem_08_2024_6.png"
            alt="USW 배경 로고"
            className="w-[600px] opacity-10 object-contain"
          />
        </div>
        <div className="relative z-10 text-center pt-60">
          <h1 className="text-5xl font-extrabold">공지사항</h1>
        </div>
      </div>

      {/* 마퀴 배너 */}
      <div className="bg-[#148cb1] overflow-hidden whitespace-nowrap h-20 flex items-center">
        <div className="animate-marquee whitespace-nowrap inline-block">
          <span className="text-4xl font-extrabold text-black pr-20">COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE.</span>
          <span className="text-4xl font-extrabold text-black pr-20">COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE.</span>
          <span className="text-4xl font-extrabold text-black pr-20">COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE.</span>
        </div>
      </div>

      {/* 아래 전체 영역 흰색으로 */}
      <div className="w-full bg-white text-black">
        {/* 카테고리 탭 */}
        <div className="max-w-4xl mx-auto px-4 pt-12">
          <div className="flex space-x-2 border-b border-gray-300">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 text-sm font-semibold rounded-t-md transition
                  ${
                    selectedCategory === cat.value
                      ? 'bg-black text-white border-l border-t border-r border-black'
                      : 'text-black hover:text-gray-500'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 공지 목록 */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <ul className="divide-y divide-gray-300">
            {notices.map(notice => (
              <li key={notice.id} className="py-6 hover:bg-gray-100 transition rounded-md px-4">
                <h2 className="text-xl font-semibold mb-1">{notice.title}</h2>
                <p className="text-gray-500 text-sm mb-2">
                  작성자: {notice.writer} | 날짜: {notice.createdAt.split('T')[0]}
                </p>
                <p className="text-gray-700 text-sm line-clamp-2">{notice.content}</p>
              </li>
            ))}
          </ul>
        </div>
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
