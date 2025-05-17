import { useEffect, useState } from 'react';
import axios from 'axios';
import ict1F from '@/assets/ict_1F.png';
import ict2F from '@/assets/ict_2F.png';
import ict3F from '@/assets/ict_3F.png';
import ict4F from '@/assets/ict_4F.png';
import ict5F from '@/assets/ict_5F.png';
import SubHeader from '@/components/SubHeader';
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

const tabs = ['소개', '전공로드맵', '교육과정', '교과목안내', '시설 안내'];

const CollegeMajorPage = () => {
  const [selectedCollegeId, setSelectedCollegeId] = useState('1');
  const [college, setCollege] = useState<College | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<MajorDetail | null>(null);
  const [activeTab, setActiveTab] = useState('소개');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [floorTab, setFloorTab] = useState('1F');

  const floorImages: Record<string, string> = {
    '1F': ict1F,
    '2F': ict2F,
    '3F': ict3F,
    '4F': ict4F,
    '5F': ict5F,
  };

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
      <SubHeader />

      {/* 흰색 본문 영역 시작 */}
      <div className="w-full bg-white text-black">
        <div className="max-w-6xl mx-auto px-4 py-10">
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
                <li><strong>위치:</strong> {selectedMajor.location}</li>
                <li><strong>전화:</strong> {selectedMajor.phone}</li>
                <li><strong>팩스:</strong> {selectedMajor.fax}</li>
                <li><strong>근무시간:</strong> {selectedMajor.officeHours}</li>
                <li><strong>미래 전망:</strong> {selectedMajor.future}</li>
                <li><strong>동아리:</strong> {selectedMajor.clubs}</li>
                <li><strong>자격증:</strong> {selectedMajor.certifications}</li>
                <li><strong>연구소:</strong> {selectedMajor.researchCenter}</li>
                <li><strong>진로:</strong> {selectedMajor.career}</li>
                <li><strong>특화 프로그램:</strong> <pre className="whitespace-pre-wrap inline">{selectedMajor.specialPrograms}</pre></li>
              </ul>
            </div>
          )}

          {activeTab === '시설 안내' && (
            <div className="bg-white text-black p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold mb-4">학과 시설 안내</h2>
              <p className="text-gray-700 mb-6">지능형SW융합대학의 층별 시설 도식도를 확인할 수 있습니다.</p>

              {/* 층 탭 */}
              <div className="flex space-x-2 mb-4">
                {['1F', '2F', '3F', '4F', '5F'].map(floor => (
                  <button
                    key={floor}
                    onClick={() => setFloorTab(floor)}
                    className={`px-4 py-2 rounded-md font-semibold ${
                      floorTab === floor ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {floor}
                  </button>
                ))}
              </div>

              {/* 이미지 표시 */}
              <div className="overflow-auto border rounded-lg p-2">
                <img src={floorImages[floorTab]} alt={`${floorTab} 도식도`} className="w-full h-auto object-contain" />
              </div>
            </div>
          )}

          {activeTab === '교수진' && <div>💡 교수진 목록 컴포넌트 삽입 예정</div>}
          {activeTab === '교육과정' && <div>💡 교육과정 목록 컴포넌트 삽입 예정</div>}
          {activeTab === '교과목안내' && <div>💡 교과목 리스트 API 기반 출력 예정</div>}
        </div>
      </div>

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
