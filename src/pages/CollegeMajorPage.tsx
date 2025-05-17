import { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronDown } from 'lucide-react';
import Header from '../components/Common/Header';

interface College {
  id: number;
  name: string;
  description: string | null;
  majorName: Array<{ id: number; name: string }>;
}

interface MajorDetail {
  id: number;
  name: string;
  introduction: string;
  location: string;
  phone: string;
  fax: string;
  officeHours: string;
  future: string;
  specialPrograms: string;
  clubs: string;
  career: string;
  certifications: string;
  researchCenter: string;
}

const collegeOptions = [
  { label: '컴퓨터학부', value: '1' },
  { label: '정보통신학부', value: '2' },
  { label: '데이터과학부', value: '3' },
  { label: '클라우드융복합', value: '4' },
];

const tabs = ['소개', '전공로드맵', '교수진', '교육과정', '교과목안내'];

const CollegeMajorPage = () => {
  const [selectedCollegeId, setSelectedCollegeId] = useState('1');
  const [college, setCollege] = useState<College | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<MajorDetail | null>(null);
  const [activeTab, setActiveTab] = useState('소개');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const fetchCollegeData = async (id: string) => {
    try {
      const res = await axios.get(`http://223.195.111.30:5062/college/${id}`);
      setCollege(res.data);
      setSelectedMajor(null);
    } catch (err) {
      console.error('학부 정보 불러오기 실패:', err);
    }
  };

  const fetchMajorDetail = async (majorId: number) => {
    try {
      const res = await axios.get(`http://223.195.111.30:5062/major/${majorId}`);
      setSelectedMajor(res.data);
    } catch (err) {
      console.error('전공 정보 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchCollegeData(selectedCollegeId);
  }, [selectedCollegeId]);

  const toggleDropdown = (target: string) => {
    setOpenDropdown(prev => (prev === target ? null : target));
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
          <h1 className="text-5xl font-extrabold">학과/학부</h1>
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

      {/* 드롭다운 메뉴 영역 */}
      <div className="bg-[#244b77] text-white py-4 px-12 flex gap-10 items-center">
        <div className="relative">
          <button onClick={() => toggleDropdown('notice')} className="flex items-center gap-2">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25694.png" alt="홈" className="w-5 h-5 filter invert" />
            <span className="font-bold">공지사항</span>
            <ChevronDown size={16} />
          </button>
          {openDropdown === 'notice' && (
            <ul className="absolute left-0 mt-2 bg-[#244b77] shadow-md rounded z-20 w-40 text-sm">
              <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer">대학안내</li>
              <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer">학과/학부</li>
              <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer">공지사항</li>
              <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer">게시판</li>
            </ul>
          )}
        </div>

        <div className="relative">
          <button onClick={() => toggleDropdown('dept')} className="flex items-center gap-2">
            <span className="font-bold">학부</span>
            <ChevronDown size={16} />
          </button>
          {openDropdown === 'dept' && (
            <ul className="absolute left-0 mt-2 bg-[#244b77] shadow-md rounded z-20 w-40 text-sm">
              <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer">학부</li>
              <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer">대학원</li>
              <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer">취업</li>
            </ul>
          )}
        </div>
      </div>

      {/* 흰색 본문 영역 시작 */}
      <div className="w-full bg-white text-black">
        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* 학부 선택 셀렉트 박스 */}
          <div className="flex gap-4 mb-6 justify-end">
            <select
              className="border p-2 rounded-md"
              value={selectedCollegeId}
              onChange={e => setSelectedCollegeId(e.target.value)}
            >
              {collegeOptions.map(c => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* 탭 메뉴 */}
          <div className="flex space-x-4 border-b mb-6">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 font-semibold ${
                  activeTab === tab ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 콘텐츠 영역 */}
          {activeTab === '소개' && college && (
            <div className="bg-gray-50 p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold mb-2">{college.name}</h2>
              <p className="whitespace-pre-wrap text-gray-800">{college.description || '설명이 없습니다.'}</p>
            </div>
          )}

          {activeTab === '전공로드맵' && college && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {college.majorName.map(m => (
                <button
                  key={m.id}
                  onClick={() => fetchMajorDetail(m.id)}
                  className="border rounded-lg p-4 bg-white text-black hover:bg-blue-50 transition"
                >
                  {m.name}
                </button>
              ))}
            </div>
          )}

          {activeTab === '전공로드맵' && selectedMajor && (
            <div className="bg-white text-black p-6 mt-6 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-2">{selectedMajor.name}</h3>
              <p className="mb-4 whitespace-pre-wrap text-gray-800">{selectedMajor.introduction}</p>
              <ul className="text-sm space-y-1">
                <li>
                  <strong>위치:</strong> {selectedMajor.location}
                </li>
                <li>
                  <strong>전화:</strong> {selectedMajor.phone}
                </li>
                <li>
                  <strong>팩스:</strong> {selectedMajor.fax}
                </li>
                <li>
                  <strong>근무시간:</strong> {selectedMajor.officeHours}
                </li>
                <li>
                  <strong>미래 전망:</strong> {selectedMajor.future}
                </li>
                <li>
                  <strong>동아리:</strong> {selectedMajor.clubs}
                </li>
                <li>
                  <strong>자격증:</strong> {selectedMajor.certifications}
                </li>
                <li>
                  <strong>연구소:</strong> {selectedMajor.researchCenter}
                </li>
                <li>
                  <strong>진로:</strong> {selectedMajor.career}
                </li>
                <li>
                  <strong>특화 프로그램:</strong>{' '}
                  <pre className="whitespace-pre-wrap inline">{selectedMajor.specialPrograms}</pre>
                </li>
              </ul>
            </div>
          )}

          {activeTab === '교수진' && <div>💡 교수진 목록 컴포넌트 삽입 예정</div>}
          {activeTab === '교육과정' && <div>💡 교육과정 목록 컴포넌트 삽입 예정</div>}
          {activeTab === '교과목안내' && <div>💡 교과목 리스트 API 기반 출력 예정</div>}
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-[#003670] text-white py-4 text-center">
        <p>© 2024 USW. All rights reserved.</p>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 120s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CollegeMajorPage;
