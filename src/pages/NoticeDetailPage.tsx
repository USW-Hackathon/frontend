import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '@/components/Footer';
import { getNotice } from '../api/notice';
import { getAllNotice } from '../api/notice';
import Header from '../components/Common/Header';
import MarqueeBanner from '@/components/MarqueeBanner';

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
  const navigate = useNavigate();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [prevPost, setPrevPost] = useState<Notice | null>(null);
  const [nextPost, setNextPost] = useState<Notice | null>(null);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await getNotice({ id: Number(id) });
        setNotice(res.data);

        const listRes = await getAllNotice({ page: 1, size: 100 }); // 전체 글을 많이 불러오기
        const list: Notice[] = listRes.data.content;

        const currentIndex = list.findIndex(item => item.id === Number(id));

        if (currentIndex !== -1) {
          setPrevPost(list[currentIndex - 1] || null);
          setNextPost(list[currentIndex + 1] || null);
        }
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

      <MarqueeBanner />

      {/* 본문 영역 */}
      <div className="w-full bg-white text-black">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <h1 className="text-3xl font-bold mb-4">{notice.title}</h1>
          <p className="text-sm text-gray-600 mb-2">
            작성자: {notice.writer} | 날짜: {notice.createdAt.split('T')[0]}
          </p>
          <hr className="my-4 border-gray-300" />
          <div className="text-base whitespace-pre-line">{notice.content}</div>
          {/* 이전글 */}
          <hr className="border-gray-300 my-3" />
          <div className="flex items-center gap-2 py-1 text-sm text-gray-800">
            <span className="font-bold">이전글</span>
            {prevPost ? (
              <>
                <span
                  className="text-lg cursor-pointer hover:text-blue-600"
                  onClick={() => navigate(`/notice-detail/${prevPost.id}`)}
                >
                  ⏶
                </span>
                <span
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => navigate(`/notice-detail/${prevPost.id}`)}
                >
                  {prevPost.title}
                </span>
              </>
            ) : (
              <>
                <span className="text-lg text-gray-400">⏶</span>
                <span className="text-gray-400">없음</span>
              </>
            )}
          </div>

          {/* 다음글 */}
          <hr className="border-gray-300 my-2" />
          <div
            className={`flex items-center gap-2 py-1 text-sm text-gray-800 ${
              nextPost ? 'cursor-pointer hover:text-blue-600' : ''
            }`}
            onClick={() => nextPost && navigate(`/notice-detail/${nextPost.id}`)}
          >
            <span className="font-bold">다음글</span>
            <span className="text-lg">⏷</span>
            <span>{nextPost ? nextPost.title : '없음'}</span>
          </div>

          <hr className="border-gray-300 my-3" />

          <div className="flex gap-2 mt-12">
            <button
              type="button"
              onClick={() => navigate('/notice/')}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              목록으로 돌아가기
            </button>
            {/* 삭제 기능 사용 시 주석 해제 */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NoticeDetailPage;
