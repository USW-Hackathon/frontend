import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoardPostId, deleteBoardPostId } from '../api/boardPost';
import Header from '../components/Common/Header';

interface BoardPost {
  id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
  viewCount: number;
  categoryId: number;
}

const BoardDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BoardPost | null>(null);

  const fetchPost = async () => {
    try {
      const res = await getBoardPostId({ id: Number(id) });
      setPost(res.data);
    } catch (e) {
      console.error('게시글 조회 실패:', e);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    const confirmDelete = window.confirm('정말 이 게시글을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await deleteBoardPostId({ id: Number(id) });
      alert('게시글이 삭제되었습니다.');
      navigate('/board');
    } catch (e) {
      console.error('❌ 게시글 삭제 실패:', e);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    fetchPost();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!post) {
    return <div className="text-center py-20 text-gray-500">게시글을 불러오는 중입니다...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white font-['Noto_Sans_KR']">
      <Header />

      {/* 🟡 게시판 상단 영역 */}
      <div className="relative h-[480px] bg-[#0d0d1a] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-end pr-12">
          <img
            src="https://www.suwon.ac.kr/usr/images/suwon/emblem_08_2024_6.png"
            alt="USW 배경 로고"
            className="w-[600px] opacity-10 object-contain"
          />
        </div>
        <div className="relative z-10 text-center pt-60">
          <h1 className="text-5xl font-extrabold">게시판</h1>
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

      {/* 게시글 상세 영역 */}
      <div className="w-full bg-white text-black">
        <div className="max-w-3xl mx-auto py-16 px-4">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-600 text-sm mb-6">
            작성자: {post.writer} | 날짜: {post.createdAt.split('T')[0]} | 조회수: {post.viewCount}
          </p>
          <div className="text-gray-800 whitespace-pre-wrap">{post.content}</div>

          <div className="flex gap-2 mt-12">
            <button
              onClick={() => navigate('/board')}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              목록으로 돌아가기
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              삭제
            </button>
          </div>
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

export default BoardDetailPage;
