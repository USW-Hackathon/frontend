import { useEffect, useState } from 'react';
import { getProfessor } from '../api/professor';
import Header from '../components/Common/Header';
import SubHeader from '../components/SubHeader';
import MarqueeBanner from '@/components/MarqueeBanner';
import { useLocation } from 'react-router-dom';
import Footer from '@/components/Footer';


interface Professor {
  id: number;
  name: string;
  division: number;
  majorName: string;
  research: string;
  email: string;
  lab: string;
  phone: string;
  imageUrl?: string | null;
}

const majorMap: Record<string, string> = {
  '0': '컴퓨터SW',
  '1': '미디어SW',
  '2': '정보보호',
  '3': '정보통신',
  '4': '데이터과학부',
  '5': '클라우드융복합',
};


const ProfessorPage = () => {
  const location = useLocation();
  const [professors, setProfessors] = useState<Professor[]>([]);

  // 경로에서 division 값을 추출
  const divisionFromPath = location.pathname.split('/').pop() || '0';
  const division = parseInt(divisionFromPath, 10);

  // major는 고정값 '0' 사용
  const major = '0';

  const fetchProfessors = async () => {
    try {
      const res = await getProfessor({ division, major });
      setProfessors(res.data);
    } catch (err) {
      console.error('교수 정보 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchProfessors();
  }, [division]);


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
          <h1 className="text-5xl font-extrabold">교수 소개</h1>
        </div>
      </div>

      {/* 마퀴 배너 */}
      <MarqueeBanner />
      <SubHeader />



      {/* 교수 카드 리스트 */}
      <div className="w-full bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {professors.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">해당 조건에 맞는 교수가 없습니다.</p>
          ) : (
            professors.map(professor => (
              <div
                key={professor.id}
                className="bg-gradient-to-br from-[#e6f0fa] to-[#f9fbfd] rounded-2xl shadow-md p-6 border border-gray-100
                         hover:shadow-xl transition duration-200 flex justify-between items-center gap-6"
              >
                {/* 왼쪽: 교수 정보 */}
                <div className="flex-1">
                  <h2 className="text-xl font-extrabold text-[#003670] mb-1">{professor.name}</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {majorMap[professor.majorName] || professor.majorName}
                  </p>
                  <div className="space-y-1 text-sm text-gray-700 leading-relaxed">
                    <p>
                      <span className="font-semibold">연구실:</span> {professor.lab || '-'}
                    </p>
                    <p>
                      <span className="font-semibold">이메일:</span> {professor.email || '-'}
                    </p>
                    <p>
                      <span className="font-semibold">전화번호:</span> {professor.phone || '-'}
                    </p>
                  </div>
                </div>

                {/* 오른쪽: 교수 사진 (조건부 렌더링) */}
                {professor.imageUrl && (
                  <div className="max-w-[120px]">
                    <img
                      src={professor.imageUrl}
                      alt={`${professor.name} 교수 사진`}
                      className="w-full object-contain"
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfessorPage;
