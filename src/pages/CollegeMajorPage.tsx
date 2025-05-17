import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import com from '@/assets/com.png';
import data from '@/assets/data.png';
import ict1F from '@/assets/ict_1F.png';
import ict2F from '@/assets/ict_2F.png';
import ict3F from '@/assets/ict_3F.png';
import ict4F from '@/assets/ict_4F.png';
import ict5F from '@/assets/ict_5F.png';
import info from '@/assets/info.png';
import infot from '@/assets/infot.png';
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

interface Course {
  id: number;
  grade: number;
  semester: number;
  subjectCode: string;
  completionType: string;
  name: string;
  credit: number;
  theoryHours: number;
  practiceHours: number;
  courseType: string;
}

const majorImages: Record<string, { src: string; label: string }> = {
  computer: { src: com, label: '컴퓨터SW' },
  data: { src: data, label: '데이터 과학부' },
  ict: { src: info, label: '정보통신' },
  cloud: { src: infot, label: '클라우드융복합' },
};

const tabs = ['소개', '교육과정', '교과목안내', '시설 안내'];

const CollegeMajorPage = () => {
  const location = useLocation();
  const [selectedCollegeId] = useState('1');
  const [college, setCollege] = useState<College | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<MajorDetail | null>(null);
  const [activeTab, setActiveTab] = useState('소개');
  const [floorTab, setFloorTab] = useState('1F');
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [selectedImage, setSelectedImage] = useState<{ src: string; label: string } | null>(null);

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

  const fetchCourses = async (grade: number) => {
    try {
      const res = await axios.get(`http://223.195.111.30:5062/course`, {
        params: { majorId: selectedCollegeId, grade },
      });
      setCourseList(res.data.courses);
    } catch (err) {
      console.error('교과과정 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchCollegeData(selectedCollegeId);
  }, [selectedCollegeId]);

  useEffect(() => {
    if (activeTab === '교육과정') {
      fetchCourses(selectedGrade);
    }
  }, [selectedGrade, activeTab]);

  useEffect(() => {
    const path = location.pathname;
    const lastSegment = path.substring(path.lastIndexOf('/') + 1);
    if (majorImages[lastSegment]) {
      setSelectedImage(majorImages[lastSegment]);
    } else {
      setSelectedImage(null);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white font-['Noto_Sans_KR']">
      <Header />
      <div className="relative h-[480px] bg-[#0d0d1a] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-end pr-12">
          <img src="https://www.suwon.ac.kr/usr/images/suwon/emblem_08_2024_6.png" alt="USW 배경 로고" className="w-[600px] opacity-10 object-contain" />
        </div>
        <div className="relative z-10 text-center pt-60">
          <h1 className="text-5xl font-extrabold">학과/학부</h1>
        </div>
      </div>
      <div className="bg-[#148cb1] overflow-hidden whitespace-nowrap h-20 flex items-center">
        <div className="animate-marquee whitespace-nowrap inline-block">
          <span className="text-4xl font-extrabold text-black pr-20">COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE.</span>
        </div>
      </div>
      <SubHeader />
      <div className="w-full bg-white text-black">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex space-x-4 border-b mb-6">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 font-semibold ${activeTab === tab ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === '소개' && college && (
            <div className="bg-gray-50 p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold mb-2">{college.name}</h2>
              <p className="whitespace-pre-wrap text-gray-800">{college.description || '설명이 없습니다.'}</p>
            </div>
          )}

          {activeTab === '교육과정' && (
            <div className="bg-white text-black p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold mb-4">학년별 교육과정</h2>
              <div className="flex space-x-2 mb-4">
                {[1, 2, 3, 4].map(grade => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`px-4 py-2 rounded-md font-semibold ${selectedGrade === grade ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {grade}학년
                  </button>
                ))}
              </div>
              <div className="overflow-auto">
                <table className="w-full table-auto border border-gray-300 text-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="border p-2">학기</th>
                      <th className="border p-2">과목코드</th>
                      <th className="border p-2">과목명</th>
                      <th className="border p-2">이수구분</th>
                      <th className="border p-2">학점</th>
                      <th className="border p-2">이론시수</th>
                      <th className="border p-2">실습시수</th>
                      <th className="border p-2">교과구분</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseList.length > 0 ? courseList.map(course => (
                      <tr key={course.id} className="text-center">
                        <td className="border p-2">{course.semester}</td>
                        <td className="border p-2">{course.subjectCode}</td>
                        <td className="border p-2 whitespace-pre-wrap">{course.name}</td>
                        <td className="border p-2">{course.completionType}</td>
                        <td className="border p-2">{course.credit}</td>
                        <td className="border p-2">{course.theoryHours}</td>
                        <td className="border p-2">{course.practiceHours}</td>
                        <td className="border p-2">{course.courseType}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={8} className="border p-4 text-center text-gray-500">데이터가 없습니다.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === '교과목안내' && (
            <div className="bg-white text-black p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold mb-4">{selectedImage?.label || '전공'} 교과목 안내</h2>
              <p className="text-gray-700 mb-6">
                {selectedImage?.label || '해당 전공'}의 교과목 안내 이미지를 아래에서 확인할 수 있습니다.
              </p>
              {selectedImage ? (
                <img
                  src={selectedImage.src}
                  alt={`${selectedImage.label} 교과목 이미지`}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              ) : (
                <p className="text-gray-500">해당 전공의 교과목 이미지가 준비되지 않았습니다.</p>
              )}
            </div>
          )}

          {activeTab === '시설 안내' && (
            <div className="bg-white text-black p-6 rounded-xl shadow">
              <h2 className="text-2xl font-bold mb-4">학과 시설 안내</h2>
              <p className="text-gray-700 mb-6">지능형SW융합대학의 층별 시설 도식도를 확인할 수 있습니다.</p>
              <div className="flex space-x-2 mb-4">
                {['1F', '2F', '3F', '4F', '5F'].map(floor => (
                  <button
                    key={floor}
                    onClick={() => setFloorTab(floor)}
                    className={`px-4 py-2 rounded-md font-semibold ${floorTab === floor ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
                  >
                    {floor}
                  </button>
                ))}
              </div>
              <div className="overflow-auto border rounded-lg p-2">
                <img src={floorImages[floorTab]} alt={`${floorTab} 도식도`} className="w-full h-auto object-contain" />
              </div>
            </div>
          )}
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
