import { ChevronDown } from 'lucide-react';

interface SubHeaderProps {
  openDropdown: string | null;
  toggleDropdown: (target: string) => void;
  selectedCollegeId: string;
  setSelectedCollegeId: (id: string) => void;
}

const collegeOptions = [
  { label: '컴퓨터학부', value: '1' },
  { label: '정보통신학부', value: '2' },
  { label: '데이터과학부', value: '3' },
  { label: '클라우드융복합', value: '4' },
];

const SubHeader = ({
  openDropdown,
  toggleDropdown,
  selectedCollegeId,
  setSelectedCollegeId,
}: SubHeaderProps) => {
  return (
    <div className="bg-[#244b77] text-white py-4 px-12 flex gap-10 items-center">
      {/* 공지사항 드롭다운 */}
      <div className="relative">
        <button onClick={() => toggleDropdown('notice')} className="flex items-center gap-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
            alt="홈"
            className="w-5 h-5 filter invert"
          />
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

      {/* 학부 선택 드롭다운 */}
      <div className="relative">
        <button onClick={() => toggleDropdown('dept')} className="flex items-center gap-2">
          <span className="font-bold">학부 선택</span>
          <ChevronDown size={16} />
        </button>
        {openDropdown === 'dept' && (
          <ul className="absolute left-0 mt-2 bg-[#244b77] shadow-md rounded z-20 w-40 text-sm">
            {collegeOptions.map(option => (
              <li
                key={option.value}
                className={`px-4 py-2 hover:bg-blue-600 cursor-pointer ${
                  selectedCollegeId === option.value ? 'bg-blue-700' : ''
                }`}
                onClick={() => {
                  setSelectedCollegeId(option.value);
                  toggleDropdown(''); // 드롭다운 닫기
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SubHeader;
