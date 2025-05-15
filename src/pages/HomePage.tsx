// src/pages/HomePage.tsx

import { useRef } from 'react';

const HomePage = () => {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

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
        <section
          ref={section1Ref}
          className="h-screen flex items-center justify-center snap-start"
        >
          <div className="text-white text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              수원대학교 지능형SW융합대학
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold mb-2">
              AI, IoT, 보안 기술을 아우르는 실무 중심 ICT 교육의 허브
            </h2>
          </div>
        </section>

        {/* 섹션 2 */}
        <section
          ref={section2Ref}
          className="h-screen flex items-center justify-center snap-start"
        >
          <h1 className="text-4xl font-bold text-white">공지사항  (학부 공지사항/ 행사-공모전/ 대학원/ 예비군) </h1>
        </section>

        {/* 섹션 3 */}
        <section
          ref={section3Ref}
          className="h-screen flex items-center justify-center snap-start"
        >
          <h1 className="text-4xl font-bold text-white">입학정보 (수원대학교,대학원 입학처 바로가기/ 우수졸업생 인터뷰 or 졸업 작품)</h1>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
