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
        <div className="group border border-gray-300 text-gray-100 p-6 rounded-2xl hover:bg-white hover:text-black transition duration-300">
          <h3 className="text-xl font-bold mb-2">학부</h3>
          <p className="text-sm leading-snug mb-4">
            2025학년도 1학기 졸업앨범 촬영 안내 <br />
            📍 서울캠퍼스
          </p>
          <p className="text-xs">2025.05.13</p>
        </div>

        {/* 대학원 */}
        <div className="group border border-gray-300 text-gray-100 p-6 rounded-2xl hover:bg-white hover:text-black transition duration-300">
          <h3 className="text-xl font-bold mb-2">대학원</h3>
          <p className="text-sm leading-snug mb-4">
            제약바이오 품질분석 전문가 양성과정 개설 <br />
            ✨ 품질관리 전문가 양성
          </p>
          <p className="text-xs">2025.05.08</p>
        </div>

        {/* 취업 */}
        <div className="group border border-gray-500 text-gray-300 p-6 rounded-2xl hover:bg-white hover:text-black transition duration-300">
          <h3 className="text-xl font-bold mb-2">취업</h3>
          <p className="text-sm leading-snug mb-4">
            2025 EMTP 초급자 교육생 모집 <br />
            🔍 한전 전력연구원
          </p>
          <p className="text-xs">2025.04.30</p>
        </div>
      </div>
    </div>

    {/* 하단: 텍스트 공지 리스트 */}
<div className="mt-4 w-full">
  <ul className="space-y-2 text-sm text-gray-200">
    {[
      { title: '삼성청년SW 아카데미(SSAFY) 14기 모집', date: '2025.04.23' },
      { title: '[ABB Korea] 영업 인턴십 모집(3개월, 정규직 전환 가능)', date: '2025.04.23' },
      { title: '[메리츠증권] IT Developer 신입채용', date: '2025.04.03' },
      { title: '2025학년도 여름 계절학기 수강신청 안내', date: '2025.04.01' },
      { title: '2025학년도 2학기 국가장학금 신청 안내', date: '2025.03.29' },
    ].map((item, index) => (
      <li
        key={index}
        className="flex justify-between px-4 py-2 rounded hover:bg-black hover:bg-opacity-20 transition duration-300 cursor-pointer"
      >
        <span>{item.title}</span>
        <span className="text-gray-400">{item.date}</span>
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
