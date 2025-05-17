import vision from '@/assets/vision.png';
import Header from '../components/Common/Header';
import SubHeader from '../components/SubHeader';
import MarqueeBanner from '@/components/MarqueeBanner';

const VisionPage = () => {
  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white font-['Noto_Sans_KR']">
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
          <h1 className="text-5xl font-extrabold">비전</h1>
        </div>
      </div>

      {/* 마퀴 배너 */}
      <MarqueeBanner />
      <SubHeader />

      {/* Vision and Ideal Talent */}
      <div className="w-full bg-white text-black pt-14 pb-14 px-4 flex flex-col items-center text-center">
        <h2 className="text-4xl font-extrabold text-[#003670] mb-4">Vision and Ideal Talent</h2>
        <p className="text-xl mb-10">창의성과 전문성을 갖춘 융합형 인재 양성</p>

        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
          <div className="text-center">
            <div className="w-52 h-52 rounded-full border-4 border-blue-500 flex items-center justify-center mx-auto mb-4 text-blue-700 font-extrabold text-xl">
              창의융합형
            </div>
            <p className="text-base text-gray-700 max-w-[220px] mx-auto leading-relaxed">
              창의성과 융합적 사고를 바탕으로 문제를 해결하는 인재
            </p>
          </div>
          <div className="text-center">
            <div className="w-52 h-52 rounded-full border-4 border-blue-500 flex items-center justify-center mx-auto mb-4 text-blue-700 font-extrabold text-xl">
              실무역량형
            </div>
            <p className="text-base text-gray-700 max-w-[220px] mx-auto leading-relaxed">
              현장 중심 교육을 통해 실제 산업에 적응 가능한 인재
            </p>
          </div>
          <div className="text-center">
            <div className="w-52 h-52 rounded-full border-4 border-blue-500 flex items-center justify-center mx-auto mb-4 text-blue-700 font-extrabold text-xl">
              글로컬리더형
            </div>
            <p className="text-base text-gray-700 max-w-[220px] mx-auto leading-relaxed">
              지역과 세계를 아우르는 감각과 소통력을 갖춘 인재
            </p>
          </div>
        </div>
      </div>

      {/* 전략 이미지 */}
      <div className="w-full bg-white text-black pt-4 pb-20 px-4 flex justify-center items-center">
        <img src={vision} alt="수원대학교 전략 목표" className="max-w-3xl w-[70%] h-auto" />
      </div>

      {/* Competency Goal HTML로 구성 */}
      <div className="bg-white text-gray-800 py-20 px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">COMPETENCY GOAL</h2>
        <p className="text-lg mb-12">학생이 길러야 할 미래사회 대응 능력</p>

        <div className="flex flex-col md:flex-row justify-center items-start gap-10 max-w-6xl mx-auto">
          {/* 창의적 문제해결력 */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-xl font-bold leading-tight text-center">
                창의적
                <br />
                문제해결력
              </span>
            </div>
            <p className="text-base text-center text-gray-700 max-w-[200px]">
              비판적 사고,
              <br />
              융합사고력 중심 역량
            </p>
          </div>

          {/* 소통·협업능력 */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-green-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-xl font-bold leading-tight text-center">
                소통
                <br />
                협업능력
              </span>
            </div>
            <p className="text-base text-center text-gray-700 max-w-[200px]">
              팀워크, 다문화 이해,
              <br />
              글로벌 커뮤니케이션 능력
            </p>
          </div>

          {/* 지속가능 리더십 */}
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-orange-400 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-xl font-bold leading-tight text-center">
                지속가능
                <br />
                리더십
              </span>
            </div>
            <p className="text-base text-center text-gray-700 max-w-[200px]">
              책임감, 사회적 가치 실현,
              <br />
              공동체 기여
            </p>
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

export default VisionPage;
