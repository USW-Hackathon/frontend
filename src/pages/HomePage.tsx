// src/pages/HomePage.tsx
import { useRef, useEffect, useState } from 'react';
import { getNotice, getAllNotice, getCategoryNotice } from '../api/notice';

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

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [resAll, res1, res2, res3] = await Promise.all([
          getAllNotice({ page: 1, size: 5, }),
          getCategoryNotice({ page: 1, size: 1, category: '1' }),
          getCategoryNotice({ page: 1, size: 1, category: '2' }),
          getCategoryNotice({ page: 1, size: 1, category: '3' }),
        ]);
        setNotice(resAll.data.content)
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
          className="h-screen flex items-center justify-center snap-start text-white px-4 md:px-12"
        >
          <div className="flex flex-col w-full max-w-7xl justify-start gap-12">
            {/* 상단: 공지 타이틀 & 카드 */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-12">
              {/* 왼쪽 설명 */}
              <div className="w-full md:w-1/3 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">📢 공지사항</h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  수원대학교 지능형SW융합대학의 최신 소식을 한눈에 확인하세요.<br />
                  학부, 대학원, 취업 관련 주요 공지사항을 빠르게 전달해드립니다.
                </p>
              </div>

              {/* 공지 카드 */}
              <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 학부 */}
                <div className="bg-white border border-gray-200 text-black p-6 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold mb-2">학부</h3>
                  <div className="mb-2">
                    <p className="text-base font-semibold truncate">{notice1?.title || '제목 로딩중'}</p>
                    <p className="text-sm text-gray-400 mt-1 truncate">
                      {notice1?.content ? notice1.content.slice(0, 40) + '...' : '내용 로딩중'}
                    </p>
                  </div>
                  <p className="text-xs" >{notice1?.createdAt?.split('T')[0] || '시간 로딩중'}</p>
                </div>

                {/* 대학원 */}
                <div className="bg-white border border-gray-200 text-black p-6 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold mb-2">대학원</h3>
                  <div className="mb-2">
                    <p className="text-base font-semibold truncate">{notice2?.title || '제목 로딩중'}</p>
                    <p className="text-sm text-gray-400 mt-1 truncate">
                      {notice2?.content ? notice2.content.slice(0, 40) + '...' : '내용 로딩중'}
                    </p>
                  </div>
                  <p className="text-xs" >{notice1?.createdAt?.split('T')[0] || '시간 로딩중'}</p>
                </div>

                {/* 취업 */}
                <div className="bg-white border border-gray-200 text-black p-6 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-bold mb-2">취업</h3>
                  <div className="mb-2">
                    <p className="text-base font-semibold truncate">{notice3?.title || '제목 로딩중'}</p>
                    <p className="text-sm text-gray-400 mt-1 truncate">
                      {notice3?.content ? notice3.content.slice(0, 40) + '...' : '내용 로딩중'}
                    </p>
                  </div>
                  <p className="text-xs" >{notice3?.createdAt?.split('T')[0] || '시간 로딩중'}</p>
                </div>
              </div>
            </div>

            {/* 하단: 텍스트 공지 리스트 */}
            <div className="mt-4 w-full">
              <ul className="space-y-2 text-sm text-gray-200">
                {notice.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between px-4 py-2 rounded hover:bg-black hover:bg-opacity-20 transition duration-300 cursor-pointer"
                  >
                    <span className="font-bold">{item.title}</span>
                    <span className="text-gray-400">{item.createdAt?.split('T')[0]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>




        {/* 섹션 3 */}
        <section ref={section3Ref} className="h-screen flex items-center justify-center snap-start">
          <h1 className="text-4xl font-bold text-white">
            입학정보 (수원대학교,대학원 입학처 바로가기/ 우수졸업생 인터뷰 or 졸업 작품)
          </h1>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
