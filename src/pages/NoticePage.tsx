import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllNotice, getCategoryNotice } from '../api/notice';
import Header from '../components/Common/Header';

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
  const { category = 'all' } = useParams();
  const navigate = useNavigate();

  const [notices, setNotices] = useState<Notice[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const size = 10;

  const fetchNotices = async () => {
    try {
      const res =
        category === 'all'
          ? await getAllNotice({ page, size })
          : await getCategoryNotice({ page, size, category: Number(category) });

      setNotices(res.data.content);
      setTotalPages(res.data.totalPages || 1);
    } catch (e) {
      console.error('공지사항 불러오기 실패:', e);
    }
  };

  useEffect(() => {
    fetchNotices();
    setPage(1);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }, [category]);

  useEffect(() => {
    fetchNotices();
  }, [page]);

  const handleCategoryClick = (value: string) => {
    navigate(`/notice/${value}`);
  };

  const handlePrev = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  const handlePageClick = (pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white font-['Noto_Sans_KR']">
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
                onClick={() => handleCategoryClick(cat.value)}
                className={`px-4 py-2 text-sm font-semibold rounded-t-md transition
                  ${category === cat.value
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
              <li
                key={notice.id}
                onClick={() => navigate(`/notice-detail/${notice.id}`)}
                className="cursor-pointer py-6 hover:bg-gray-100 transition rounded-md px-4"
              >
                <h2 className="text-xl font-semibold mb-1">{notice.title}</h2>
                <p className="text-gray-500 text-sm mb-2">
                  작성자: {notice.writer} | 날짜: {notice.createdAt.split('T')[0]}
                </p>
                <p className="text-gray-700 text-sm line-clamp-2">{notice.content}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center gap-2 pb-12">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-30"
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => handlePageClick(p)}
              className={`px-3 py-1 rounded ${
                page === p ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-30"
          >
            다음
          </button>
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
