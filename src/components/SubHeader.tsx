import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Home } from 'lucide-react';

interface SubHeaderProps {
  defaultMainCategory?: string;
  defaultSubCategoryPath?: string;
}

const menuMap: Record<
  string,
  {
    value: string;
    sub: Array<{ name: string; path: string }>;
  }
> = {
  '대학안내': {
    value: 'about',
    sub: [
      { name: '비전', path: '/about/vision' },
      { name: '교수진', path: '/about/professor' },
      { name: '찾아오시는 길', path: '/about/location' },
    ],
  },
  '학과/학부': {
    value: 'departments',
    sub: [
      { name: '컴퓨터학부', path: '/departments/computer' },
      { name: '정보통신학부', path: '/departments/ict' },
      { name: '데이터과학부', path: '/departments/data' },
      { name: '클라우드융복합', path: '/departments/cloud' },
    ],
  },
  '공지사항': {
    value: 'notice',
    sub: [
      { name: '전체', path: '/notice/all' },
      { name: '학부', path: '/notice/2' },
      { name: '대학원', path: '/notice/3' },
      { name: '취업', path: '/notice/1' },
    ],
  },
  '게시판': {
    value: 'board',
    sub: [
      { name: '전체', path: '/board/0' },
      { name: '뉴스', path: '/board/1' },
      { name: '학생이야기', path: '/board/2' },
      { name: '졸업작품', path: '/board/3' },
    ],
  },
};

const SubHeader = ({ defaultMainCategory, defaultSubCategoryPath }: SubHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const fallbackMain = Object.keys(menuMap)[0];
  const fallbackSub = menuMap[fallbackMain].sub[0];

  const resolvedMain = defaultMainCategory || fallbackMain;
  const resolvedSub =
    (defaultMainCategory &&
      defaultSubCategoryPath &&
      menuMap[defaultMainCategory]?.sub.find(item => item.path === defaultSubCategoryPath)) ||
    fallbackSub;

  const [mainCategory, setMainCategory] = useState(resolvedMain);
  const [subCategory, setSubCategory] = useState(resolvedSub);

  const [mainOpen, setMainOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  useEffect(() => {
    if (defaultMainCategory && defaultSubCategoryPath) {
      setMainCategory(defaultMainCategory);
      const sub = menuMap[defaultMainCategory].sub.find(item => item.path === defaultSubCategoryPath);
      if (sub) setSubCategory(sub);
      return;
    }

    const path = location.pathname;

    for (const [mainKey, { sub }] of Object.entries(menuMap)) {
      const match = sub.find(item => path.startsWith(item.path));
      if (match) {
        setMainCategory(mainKey);
        setSubCategory(match);
        return;
      }
    }

    setMainCategory(fallbackMain);
    setSubCategory(fallbackSub);
  }, [location.pathname, defaultMainCategory, defaultSubCategoryPath]);

  const handleMainSelect = (item: string) => {
    const firstSub = menuMap[item].sub[0];
    setMainCategory(item);
    setSubCategory(firstSub);
    setMainOpen(false);
    setSubOpen(false);
    navigate(firstSub.path);
  };

  const handleSubSelect = (item: { name: string; path: string }) => {
    setSubCategory(item);
    setMainOpen(false);
    setSubOpen(false);
    navigate(item.path);
  };

  const handleHome = () => {
    setMainCategory(fallbackMain);
    setSubCategory(fallbackSub);
    setMainOpen(false);
    setSubOpen(false);
    navigate('/');
  };

  return (
    <div className="bg-[#244b77] w-full px-0 py-4 text-white text-base shadow-md flex items-center">
      <div className="flex items-center gap-4 pl-6">
        <button
          className="mpr-6 cursor-pointer hover:text-blue-300 font-semibold pr-4 py-2 flex items-center gap-1"
          onClick={handleHome}
        >
          <Home size={20} />
          <span>홈</span>
        </button>
        <div className="h-6 border-l border-white"></div>

        {/* 상위 탭 */}
        <div className="relative">
          <button
            onClick={() => {
              setMainOpen(prev => !prev);
              setSubOpen(false);
            }}
            className="pr-4 pl-4 w-[10rem] py-2 font-semibold hover:text-blue-300 text-left"
          >
            <div className="flex items-center justify-center gap-1">
              <span className="w-full text-center">{mainCategory}</span>
              <ChevronDown size={16} />
            </div>
          </button>
          {mainOpen && (
            <ul className="absolute mt-2 w-[10rem] bg-[#244b77] rounded shadow-lg text-base z-50 text-center">
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

        <div className="h-6 border-l border-white"></div>

        {/* 하위 탭 */}
        <div className="relative">
          <button
            onClick={() => {
              setSubOpen(prev => !prev);
              setMainOpen(false);
            }}
            className="pr-4 pl-4 w-[10rem] py-2 font-semibold hover:text-blue-300 text-left"
          >
            <div className="flex items-center justify-center gap-1">
              <span className="w-full text-center">{subCategory.name}</span>
              <ChevronDown size={16} />
            </div>
          </button>
          {subOpen && (
            <ul className="absolute mt-2 w-[10rem] bg-[#244b77] rounded shadow-lg text-base z-50 text-center">
              {menuMap[mainCategory].sub
                .filter(item => item.name !== subCategory.name)
                .map(item => (
                  <li
                    key={item.name}
                    onClick={() => handleSubSelect(item)}
                    className="px-4 py-2 hover:bg-blue-600 cursor-pointer"
                  >
                    {item.name}
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
