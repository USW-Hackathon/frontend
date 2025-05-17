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
  const [prevPost, setPrevPost] = useState<BoardPost | null>(null);
  const [nextPost, setNextPost] = useState<BoardPost | null>(null);

  const fetchPost = async () => {
    try {
      const res = await getBoardPostId({ id: Number(id) });
      setPost(res.data);
    } catch (e) {
      console.error('게시글 조회 실패:', e);
    }
  };

  const fetchAdjacentPosts = async () => {
    try {
      const nextRes = await getBoardPostId({ id: Number(id) - 1 }); // 다음글
      setNextPost(nextRes.data);
    } catch (e) {
      setNextPost(null);
    }

    try {
      const prevRes = await getBoardPostId({ id: Number(id) + 1 }); // 이전글
      setPrevPost(prevRes.data);
    } catch (e) {
      setPrevPost(null);
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
    fetchAdjacentPosts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!post) {
    return <div className="text-center py-20 text-gray-500">게시글을 불러오는 중입니다...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white font-['Noto_Sans_KR']">
      <Header />

      {/* 상단 영역 */}
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
          <hr className="border-gray-700 mb-4" />
          <p className="text-gray-600 text-sm mb-4">
            작성자: {post.writer} | 날짜: {post.createdAt.split('T')[0]} | 조회수: {post.viewCount}
          </p>
          <hr className="border-gray-300 mb-6" />
          <div className="text-gray-800 whitespace-pre-wrap mb-12">{post.content}</div>

          {/* 이전글 */}
          <hr className="border-gray-300 my-3" />
          <div className="flex items-center gap-2 py-1 text-sm text-gray-800">
            <span className="font-bold">이전글</span>
            {prevPost ? (
              <>
                <span
                  className="text-lg cursor-pointer hover:text-blue-600"
                  onClick={() => navigate(`/board-posts/${prevPost.id}`)}
                >
                  ⏶
                </span>
                <span
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => navigate(`/board-posts/${prevPost.id}`)}
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
            onClick={() => nextPost && navigate(`/board-posts/${nextPost.id}`)}
          >
            <span className="font-bold">다음글</span>
            <span className="text-lg">⏷</span>
            <span>{nextPost ? nextPost.title : '없음'}</span>
          </div>

          <hr className="border-gray-300 my-3" />

          <div className="flex gap-2 mt-12">
            <button
              type="button"
              onClick={() => navigate('/board/1')}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              목록으로 돌아가기
            </button>
            {/* 삭제 기능 사용 시 주석 해제 */}
            { <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              삭제
            </button>}
          </div>
        </div>
      </div>

      {/* marquee 애니메이션 스타일 */}
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
