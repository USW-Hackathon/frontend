import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNotice } from '../api/notice';
import Header from '../components/Common/Header';

interface Notice {
  id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
  viewCount: number;
}

const NoticeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await getNotice({ id: Number(id) });
        setNotice(res.data);
      } catch (e) {
        console.error('공지사항 상세 조회 실패:', e);
      }
    };

    fetchNotice();
  }, [id]);

  if (!notice) return <div className="text-center mt-20 text-gray-500">로딩 중...</div>;

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

      {/* 본문 영역 */}
      <div className="w-full bg-white text-black">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <h1 className="text-3xl font-bold mb-4">{notice.title}</h1>
          <p className="text-sm text-gray-600 mb-2">
            작성자: {notice.writer} | 날짜: {notice.createdAt.split('T')[0]}
          </p>
          <hr className="my-4 border-gray-300" />
          <div className="text-base whitespace-pre-line">{notice.content}</div>
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

export default NoticeDetailPage;
