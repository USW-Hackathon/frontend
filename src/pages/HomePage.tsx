// src/pages/HomePage.tsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllNotice, getCategoryNotice, getNotice } from '../api/notice';
import Header from '../components/Common/Header'; // 헤더 컴포넌트
import { useForm } from 'react-hook-form';
import useLogin from '@/hooks/useLogin';
import Footer from '@/components/Footer';

interface Notice {
  id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
  viewCount: number;
  category: number;
}

const HomePage = () => {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const [notice, setNotice] = useState<Notice[]>([]);
  const [notice1, setNotice1] = useState<Notice | null>(null);
  const [notice2, setNotice2] = useState<Notice | null>(null);
  const [notice3, setNotice3] = useState<Notice | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [resAll, res1, res2, res3] = await Promise.all([
          getAllNotice({ page: 1, size: 5 }),
          getCategoryNotice({ page: 1, size: 1, category: 1 }),
          getCategoryNotice({ page: 1, size: 1, category: 2 }),
          getCategoryNotice({ page: 1, size: 1, category: 3 }),
        ]);
        setNotice(resAll.data.content);
        setNotice1(res1.data.content[0]);
        setNotice2(res2.data.content[0]);
        setNotice3(res3.data.content[0]);
      } catch (e) {
        console.error('공지 가져오기 실패:', e);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="relative h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {/* 상단 헤더 */}
      <Header />
      {/* 배경 영상 */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="https://www.suwon.ac.kr/usr/file/USW_video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 반투명 오버레이 */}
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

      {/* 섹션 내용 */}
      <div className="relative z-20">
        {/* 섹션 1 */}
        <section ref={section1Ref} className="h-screen flex items-center justify-center snap-start">
          <div className="text-white text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">수원대학교 지능형SW융합대학</h1>
            <h2 className="text-2xl md:text-4xl font-semibold mb-2">
              AI, IoT, 보안 기술을 아우르는 실무 중심 ICT 교육의 허브
            </h2>
          </div>
        </section>

        {/* 메인 섹션 2 */}
        <section
          ref={section2Ref}
          className="h-auto flex flex-col items-center justify-center snap-start text-white px-4 md:px-12 py-16"
        >
          <div className="flex flex-col w-full max-w-7xl justify-start gap-16 mt-10">
            {/* 1. 로그인 + 공지 박스 + 카드 */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* 로그인 */}
              <div className="bg-white/15 text-white border-gray-200 text-black p-6 rounded-2xl shadow-md w-full md:w-1/3 flex flex-col justify-between">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">LOGIN</h2>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="아이디를 입력해주세요"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="flex items-center justify-between mb-4 text-sm text-white">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> 아이디 저장
                  </label>
                  <div className="flex space-x-2 text-white font-semibold">
                    <a href="#">아이디 찾기</a>
                    <span>|</span>
                    <a href="#">비밀번호 찾기</a>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-2 rounded-md hover:from-blue-700 hover:to-blue-900 transition-colors duration-300">
                  로그인
                </button>
                <div className="mt-4 p-3 bg-red-50 text-xs text-left text-gray-800 rounded-md border border-red-200">
                  <p className="mb-1">
                    <span className="font-semibold text-white">※ 아이디 :</span> 학번 또는 사번
                  </p>
                  <p>
                    <span className="font-semibold text-red-600">※ 초기비밀번호 :</span> 생년월일(YYMMDD) + 12!
                  </p>
                </div>
              </div>

              {/* 오른쪽 전체 박스 */}
              <div className="flex flex-col w-full md:w-2/3">
                <div className="flex flex-col h-full">
                  {/* 가로로 긴 컴포넌트 */}
                  <div className="bg-white/20 p-4 rounded-2xl text-white shadow-md h-1/3">
                    <h2
                      onClick={() => navigate('/notice')}
                      className="text-white text-3xl md:text-4xl font-bold cursor-pointer hover:text-yellow-300 mb-5 transition duration-300"
                    >
                      공지사항
                    </h2>
                    <h3 className="text-xl font-bold mb-2">
                      수원대학교 지능형SW융합대학의 최신 소식을 한눈에 확인하세요.
                    </h3>
                  </div>

                  {/* 공지 카드 3개 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-2/3 mt-6">
                    {[notice1, notice2, notice3].map((notice, i) => (
                      <div
                        key={i}
                        className="bg-white/15 text-white border-gray-200 text-black p-6 rounded-2xl shadow-md h-full"
                      >
                        <h3 className="text-xl font-bold mb-2">{['학부', '대학원', '취업'][i]}</h3>
                        <div className="mb-2">
                          <p className="text-base font-semibold truncate">{notice?.title || '제목 로딩중'}</p>
                          <p className="text-sm text-gray-400 mt-1 truncate">
                            {notice?.content ? notice.content.slice(0, 40) + '...' : '내용 로딩중'}
                          </p>
                        </div>
                        <p className="text-xs">{notice?.createdAt?.split('T')[0] || '시간 로딩중'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. 공지 리스트 */}
            <div className="w-full">
              <ul className="space-y-2 text-sm text-gray-200">
                {notice.map((item, index) => (
                  <li
                    key={index}
                    className="border-b border-white/30 flex justify-between px-4 py-2 rounded hover:bg-black hover:bg-opacity-20 hover:shadow-inner hover:-translate-y-[2px] transition duration-300 cursor-pointer"
                  >
                    <span className="font-bold">{item.title}</span>
                    <span className="text-gray-400">{item.createdAt?.split('T')[0]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 메인 섹션 3 */}
        <section className="h-screen flex flex-col items-center justify-center snap-start text-white px-4 md:px-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center drop-shadow-lg">어떤 학부가 궁금하세요?</h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl drop-shadow-md">
            수원대학교 지능형SW융합대학은 다양한 학부와 전공을 통해 실무 중심의 교육을 제공합니다. 원하는 학부를 선택해
            자세한 정보를 확인해보세요.
          </p>

          {/* 카드 컨테이너 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
            {[
              { title: '컴퓨터학부', link: '/departments/computer' },
              { title: '정보통신학부', link: '/departments/ict' },
              { title: '데이터과학부', link: '/departments/data' },
              { title: '클라우드융복합', link: '/departments/cloud' },
            ].map((dept, idx) => (
              <a
                key={idx}
                href={dept.link}
                className="rounded-2xl p-6 h-40 flex flex-col justify-center items-center
                   bg-white text-black border border-gray-200 shadow-md
                   transition duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-2">{dept.title}</h3>
                <p className="text-sm text-gray-600">자세히 보기 →</p>
              </a>
            ))}
          </div>
        </section>

        {/* 섹션 4 - 입학정보 + 홍보 영상 */}
        <section
          ref={section3Ref}
          className="h-auto min-h-screen flex flex-col items-center justify-center snap-start text-white px-4 md:px-12 py-20"
        >
          {/* 🎓 입학정보 타이틀 */}
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">🎓 입학정보</h2>

          {/* 카드 영역 */}
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* 입학처 카드 */}
            <div className="group border border-blue-500 text-blue-400 p-5 rounded-xl hover:bg-blue-500 hover:text-white transition duration-300">
              <h3 className="text-lg font-bold mb-2">수원대 입학처</h3>
              <p className="text-sm mb-3">학부 입학 관련 정보 바로가기</p>
              <a
                href="https://ipsi.suwon.ac.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline"
              >
                입학처 홈페이지 →
              </a>
            </div>

            {/* 대학원 카드 */}
            <div className="group border border-green-500 text-green-400 p-5 rounded-xl hover:bg-green-500 hover:text-white transition duration-300">
              <h3 className="text-lg font-bold mb-2">대학원 입학</h3>
              <p className="text-sm mb-3">수원대 대학원 입학정보 확인</p>
              <a
                href="https://graduate.suwon.ac.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline"
              >
                대학원 바로가기 →
              </a>
            </div>

            {/* 졸업작품 카드 */}
            <div className="group border border-yellow-500 text-yellow-400 p-5 rounded-xl hover:bg-yellow-500 hover:text-black transition duration-300">
              <h3 className="text-lg font-bold mb-2">졸업작품/인터뷰</h3>
              <p className="text-sm mb-3">우수 졸업작품 소개 & 졸업생 인터뷰</p>
              <button className="underline text-sm">영상 보러가기 ▶</button>
            </div>
          </div>

          {/* 🎥 USW VIDEO 타이틀 */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">🎥 USW VIDEO</h2>

          {/* 영상 영역 */}
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 영상 1 */}
            <h2 className="w-full aspect-[16/9] max-w-[480px] mx-auto">
              <iframe
                className="w-full h-full rounded-lg shadow-md"
                src="https://www.youtube.com/embed/83RTUfy2Lt8?rel=0"
                title="하늘에서 본 수원대"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </h2>

            {/* 영상 2 */}
            <div className="w-full aspect-[16/9] max-w-[480px] mx-auto">
              <iframe
                className="w-full h-full rounded-lg shadow-md"
                src="https://www.youtube.com/embed/Jww1uiWUmmk?rel=0"
                title="수원대학교 기숙사 투어"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        <section className="h-screen flex flex-col items-center justify-center snap-start text-white px-4 md:px-12 relative">
          <div
            className="absolute inset-0 bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://www.suwon.ac.kr/usr/images/suwon/emblem_08_2024_6.png)',
              backgroundSize: 'contain', // 또는 'cover'
              backgroundPosition: 'center',
              opacity: 0.3,
            }}
          />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg italic mb-5">
              Intelligence Convergence University
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg italic">Suwon University</h1>
          </div>
        </section>
      </div>
      <section className="h-auto snap-start">
      <Footer />
      </section>
    </div>
  );
};

export default HomePage;
