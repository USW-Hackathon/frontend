import { useEffect, useState } from 'react';
import { getProfessor } from '../api/professor';
import Header from '../components/Common/Header';
import Footer from '＠/components/Footer';

interface Professor {
  id: number;
  name: string;
  division: string;
  majorName: string;
  research: string;
  email: string;
  lab: string;
  phone: string;
  imageUrl?: string | null;
}

const divisionOptions = [
  { label: '전체', value: '0' },
  { label: '컴퓨터학부', value: '1' },
  { label: '정보통신학부', value: '2' },
  { label: '데이터과학부', value: '3' },
  { label: '클라우드융복합', value: '4' },
];

const majorOptionsByDivision: Record<string, Array<{ label: string; value: string }>> = {
  '0': [{ label: '전체', value: '0' }],
  '1': [
    { label: '컴퓨터SW', value: '1' },
    { label: '미디어SW', value: '2' },
  ],
  '2': [
    { label: '정보보호', value: '3' },
    { label: '정보통신', value: '4' },
  ],
  '3': [{ label: '데이터과학', value: '5' }],
  '4': [{ label: '클라우드융복합', value: '6' }],
};

const ProfessorPage = () => {
  const [division, setDivision] = useState('0');
  const [major, setMajor] = useState('0');
  const [professors, setProfessors] = useState<Professor[]>([]);

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
  }, [division, major]);

  const availableMajorOptions = division ? majorOptionsByDivision[division] || [] : [];

  const handleDivisionChange = (value: string) => {
    setDivision(value);
    setMajor('');
  };

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
        <div className="bg-[#148cb1] overflow-hidden whitespace-nowrap h-20 flex items-center">
          <div className="animate-marquee whitespace-nowrap inline-block">
            <span className="text-4xl font-extrabold text-black pr-20">
              COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE.
            </span>
            <span className="text-4xl font-extrabold text-black pr-20">
              COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE.
            </span>
            <span className="text-4xl font-extrabold text-black pr-20">
              COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE.
            </span>
          </div>
        </div>
        {/* 필터 드롭다운 */}
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-4 justify-center items-center">
          <select
            className="border border-gray-300 rounded-md p-2 text-black bg-white shadow-sm focus:ring-2 focus:ring-[#003670]"
            value={division}
            onChange={e => handleDivisionChange(e.target.value)}
          >
            {divisionOptions.map(d => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded-md p-2 text-black bg-white shadow-sm focus:ring-2 focus:ring-[#003670]"
            value={major}
            onChange={e => setMajor(e.target.value)}
            disabled={!division}
          >
            <option value="0">전체</option>
            {availableMajorOptions.map(m => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

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
                    <p className="text-sm text-gray-600 mb-4">{professor.majorName}</p>

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
        ＜Footer ／＞

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

export default ProfessorPage;
