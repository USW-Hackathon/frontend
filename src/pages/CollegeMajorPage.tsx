import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import com from '@/assets/com.png';
import data from '@/assets/data.png';
import ict1F from '@/assets/ict_1F.png';
import ict2F from '@/assets/ict_2F.png';
import ict3F from '@/assets/ict_3F.png';
import ict4F from '@/assets/ict_4F.png';
import ict5F from '@/assets/ict_5F.png';
import info from '@/assets/info.png';
import infot from '@/assets/infot.png';
import Footer from '@/components/Footer';
import MarqueeBanner from '@/components/MarqueeBanner';
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

const majorImages: Record<string, { src: string; label: string; value: number }> = {
  computer: { src: com, label: '컴퓨터SW', value: 1 },
  data: { src: data, label: '데이터 과학부', value: 2 },
  ict: { src: info, label: '정보통신', value: 3 },
  cloud: { src: infot, label: '클라우드융복합', value: 4 },
};

const floorImages: Record<string, string> = {
  '1F': ict1F,
  '2F': ict2F,
  '3F': ict3F,
  '4F': ict4F,
  '5F': ict5F,
};

const tabs = ['소개', '교육과정', '교과목안내', '시설 안내'];

const CollegeMajorPage = () => {
  const location = useLocation();
  const [majorId, setMajorId] = useState<number | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<MajorDetail | null>(null);
  const [college, setCollege] = useState<College | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; label: string } | null>(null);
  const [activeTab, setActiveTab] = useState('소개');
  const [floorTab, setFloorTab] = useState('1F');
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [courseList, setCourseList] = useState<Course[]>([]);
  const selectedCollegeId = '1';

  const majorImagesById: Record<number, { src: string; label: string } | undefined> = {
    1: { src: com, label: '컴퓨터SW' },
    2: { src: com, label: '미디어SW' },
    3: { src: info, label: '정보보호' },
    4: { src: infot, label: '정보통신' },
    5: { src: data, label: '데이터과학' },
    6: undefined, // 이미지 없음 처리
  };

  useEffect(() => {
    const segments = location.pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    const parsedMajorId = parseInt(lastSegment, 10);

    if (!isNaN(parsedMajorId)) {
      setMajorId(parsedMajorId);
      fetchMajorDetail(parsedMajorId);
      setSelectedImage(majorImagesById[parsedMajorId] || null);
    } else {
      console.warn('유효하지 않은 majorId:', lastSegment);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        const res = await axios.get(`http://223.195.111.30:5062/college/${selectedCollegeId}`);
        setCollege(res.data);
      } catch (err) {
        console.error('학부 정보 불러오기 실패:', err);
      }
    };

    fetchCollegeData();
  }, [selectedCollegeId]);

  useEffect(() => {
    if (activeTab === '교육과정' && majorId !== null) {
      fetchCourses(majorId, selectedGrade);
    }
  }, [activeTab, selectedGrade, majorId]);

  const fetchMajorDetail = async (id: number) => {
    try {
      const res = await axios.get(`http://223.195.111.30:5062/major/${id}`);
      console.log('전공 정보:', res.data);
      setSelectedMajor(res.data);
    } catch (err) {
      console.error('전공 정보 불러오기 실패:', err);
    }
  };

  const fetchCourses = async (id: number, grade: number) => {
    try {
      const res = await axios.get(`http://223.195.111.30:5062/course`, {
        params: { majorId: id, grade },
      });
      setCourseList(res.data.courses);
    } catch (err) {
      console.error('교과과정 불러오기 실패:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white font-['Noto_Sans_KR']">
      <Header />
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
      <MarqueeBanner />
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

          {activeTab === '소개' && selectedMajor && (
            <div className="bg-white text-black p-6 rounded-xl shadow space-y-6">
              <h2 className="text-3xl font-bold text-blue-700">{selectedMajor.name} 전공 소개</h2>
              <section>
                <h3 className="text-xl font-semibold mb-2">전공 개요</h3>
                <p className="text-gray-800 whitespace-pre-wrap">{selectedMajor.introduction}</p>
              </section>
              <section>
                <h3 className="text-xl font-semibold mb-2">학과 위치 및 연락처</h3>
                <ul className="text-gray-700 space-y-1">
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
                </ul>
              </section>
              <section>
                <h3 className="text-xl font-semibold mb-2">연구소 및 연구 프로젝트</h3>
                <p className="text-gray-800 whitespace-pre-wrap">{selectedMajor.researchCenter}</p>
              </section>
              <section>
                <h3 className="text-xl font-semibold mb-2">진로 및 자격증</h3>
                <ul className="text-gray-800 list-disc pl-6">
                  <li>
                    <strong>진로:</strong> {selectedMajor.career}
                  </li>
                  <li>
                    <strong>자격증:</strong> {selectedMajor.certifications}
                  </li>
                </ul>
              </section>
              <section>
                <h3 className="text-xl font-semibold mb-2">동아리 활동</h3>
                <p className="text-gray-800 whitespace-pre-wrap">{selectedMajor.clubs}</p>
              </section>
              <section>
                <h3 className="text-xl font-semibold mb-2">특화 프로그램</h3>
                <p className="text-gray-800 whitespace-pre-wrap">{selectedMajor.specialPrograms}</p>
              </section>
              <section>
                <h3 className="text-xl font-semibold mb-2">전공의 미래 전망</h3>
                <p className="text-gray-800 whitespace-pre-wrap">{selectedMajor.future}</p>
              </section>
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
                    {courseList.length > 0 ? (
                      courseList.map(course => (
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="border p-4 text-center text-gray-500">
                          데이터가 없습니다.
                        </td>
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
                {Object.keys(floorImages).map(floor => (
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
      <Footer />
    </div>
  );
};

export default CollegeMajorPage;
