import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getAllBoardPost } from '../api/boardPost';
import Header from '../components/Common/Header';
import SubHeader from '@/components/SubHeader'
import MarqueeBanner from '@/components/MarqueeBanner';

interface BoardPost {
  id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
  viewCount: number;
  categoryId: number;
  parentId: number | null;
}

const categories = [
  { label: '전체', value: '0' },
  { label: '뉴스', value: '1' },
  { label: '학생이야기', value: '2' },
  { label: '졸업작품', value: '3' },
];

const BoardPage = () => {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { categoryId = '0' } = useParams();
  const page = Number(searchParams.get('page') || 1);
  const size = 10;

  const fetchBoardPosts = async () => {
    try {
      const query: any = {
        page,
        size,
        categoryId: Number(categoryId), // 0도 포함해서 항상 전달
      };

      const res = await getAllBoardPost(query);
      setPosts(res.data.boardPostList);
      setTotalPages(res.data.totalPages ?? 1);
    } catch (e) {
      console.error('게시글 불러오기 실패:', e);
    }
  };

  useEffect(() => {
    fetchBoardPosts();
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }, [categoryId, page]);

  const handleCategoryChange = (value: string) => {
    navigate(`/board/${value}?page=1`);
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/board/${categoryId}?page=${newPage}`);
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white font-['Noto_Sans_KR']">
      <Header />

      {/* 타이틀 */}
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
      <MarqueeBanner />
      <SubHeader />

      {/* 흰색 영역 */}
      <div className="w-full bg-white text-black">
        {/* 카테고리 탭 */}
        <div className="max-w-4xl mx-auto px-4 pt-12 flex justify-between items-center">

          {/* 글쓰기 버튼 */}
          <button
            onClick={() => navigate('/board-posts/write')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            글쓰기
          </button>
        </div>

        {/* 게시글 목록 */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <ul className="divide-y divide-gray-300">
            {posts.map(post => (
              <li
                key={post.id}
                onClick={() => navigate(`/board-posts/${post.id}`)}
                className="cursor-pointer py-6 hover:bg-gray-100 transition rounded-md px-4"
              >
                <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
                <p className="text-gray-500 text-sm mb-2">
                  작성자: {post.writer} | 날짜: {post.createdAt.split('T')[0]} | 조회수: {post.viewCount}
                </p>
                <p className="text-gray-700 text-sm line-clamp-2">{post.content}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center gap-2 pb-12">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-30"
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`px-3 py-1 rounded ${page === p ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
                }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-30"
          >
            다음
          </button>
        </div>
      </div>

    </div>
  );
};

export default BoardPage;
