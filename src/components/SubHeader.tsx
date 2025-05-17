import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const menuMap: Record<string, string[]> = {
  '대학안내': ['비전', '교수진', '찾아오시는 길'],
  '학과/학부': ['컴퓨터학부', '정보통신학부', '데이터과학부', '클라우드융복합'],
  '공지사항': ['학부', '대학원', '취업'],
  '게시판': ['뉴스', '학생이야기', '졸업작품'],
};

const MAIN_KEY = 'mainCategory';
const SUB_KEY = 'subCategory';

const SubHeader = () => {
  const navigate = useNavigate();

  const initialMain = localStorage.getItem(MAIN_KEY) || Object.keys(menuMap)[0];
  const initialSub = localStorage.getItem(SUB_KEY) || menuMap[initialMain][0];

  const [mainCategory, setMainCategory] = useState(initialMain);
  const [subCategory, setSubCategory] = useState(initialSub);

  const [mainOpen, setMainOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  const handleMainSelect = (item: string) => {
    const firstSub = menuMap[item][0];
    localStorage.setItem(MAIN_KEY, item);
    localStorage.setItem(SUB_KEY, firstSub);
    setMainCategory(item);
    setSubCategory(firstSub);
    setMainOpen(false);
    navigate(`/${encodeURIComponent(firstSub)}`);
  };

  const handleSubSelect = (item: string) => {
    localStorage.setItem(SUB_KEY, item);
    setSubCategory(item);
    setSubOpen(false);
    navigate(`/${encodeURIComponent(item)}`);
  };

  const handleHome = () => {
    localStorage.removeItem(MAIN_KEY);
    localStorage.removeItem(SUB_KEY);
    const firstMain = Object.keys(menuMap)[0];
    const firstSub = menuMap[firstMain][0];
    setMainCategory(firstMain);
    setSubCategory(firstSub);
    setMainOpen(false);
    setSubOpen(false);
    navigate('/');
  };

  return (
    <div className="bg-[#244b77] w-full px-0 py-4 text-white text-base shadow-md flex justify-between items-center">
      {/* 홈 - 왼쪽 */}
      <span
        className="cursor-pointer hover:text-blue-300 font-semibold pl-6 pr-6 py-2"
        onClick={handleHome}
      >
        홈
      </span>

      {/* 중앙 탭 그룹 */}
      <div className="flex items-center gap-4 justify-center">
        {/* | divider */}
        <div className="h-6 border-l border-white"></div>

        {/* 상위 탭 */}
        <div className="relative">
          <button
            onClick={() => {
              setMainOpen(prev => !prev);
              setSubOpen(false);
            }}
            className="w-[8rem] py-2 font-semibold hover:text-blue-300 text-left"
          >
            <div className="flex items-center justify-center gap-1">
              <span className="w-full text-center">{mainCategory}</span>
              <ChevronDown size={16} />
            </div>
          </button>
          {mainOpen && (
            <ul className="absolute mt-2 w-[8rem] bg-[#244b77] rounded shadow-lg text-base z-50 text-center">
              {Object.keys(menuMap)
                .filter(item => item !== mainCategory)
                .map(item => (
                  <li
                    key={item}
                    onClick={() => handleMainSelect(item)}
                    className="px-4 py-2 hover:bg-blue-600 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* | divider */}
        <div className="h-6 border-l border-white"></div>

        {/* 하위 탭 */}
        <div className="relative">
          <button
            onClick={() => {
              setSubOpen(prev => !prev);
              setMainOpen(false);
            }}
            className="w-[8rem] py-2 font-semibold hover:text-blue-300 text-left"
          >
            <div className="flex items-center justify-center gap-1">
              <span className="w-full text-center">{subCategory}</span>
              <ChevronDown size={16} />
            </div>
          </button>
          {subOpen && (
            <ul className="absolute mt-2 w-[8rem] bg-[#244b77] rounded shadow-lg text-base z-50 text-center">
              {menuMap[mainCategory]
                .filter(item => item !== subCategory)
                .map(item => (
                  <li
                    key={item}
                    onClick={() => handleSubSelect(item)}
                    className="px-4 py-2 hover:bg-blue-600 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
