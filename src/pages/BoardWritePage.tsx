import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postBoardPost } from '../api/boardPost';
import Header from '../components/Common/Header';
import Footer from '@/components/Footer';

const categories = [
  { label: '뉴스', value: 1 },
  { label: '학생이야기', value: 2 },
  { label: '졸업작품', value: 3 },
];

const BoardWritePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writer, setWriter] = useState('');
  const [categoryId, setCategoryId] = useState(1);

  const handleSubmit = async () => {
    if (!title || !content || !writer) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      await postBoardPost({
        title,
        content,
        writer,
        categoryId,
        parentId: null,
      });
      alert('게시글이 등록되었습니다.');
      navigate('/board');
    } catch (e) {
      console.error('게시글 등록 실패:', e);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-['Noto_Sans_KR']">
      <Header />

      <div className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">게시글 작성</h1>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">카테고리</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">작성자</label>
          <input
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="이름을 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">제목</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="제목을 입력하세요"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="내용을 입력하세요"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            등록
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BoardWritePage;
