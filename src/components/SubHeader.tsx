import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Home } from 'lucide-react';

interface SubHeaderProps {
  defaultMainCategory?: string;
  defaultSubCategoryPath?: string;
}

interface SubSubMenuItem {
  name: string;
  path: string;
  value: number;
}

interface SubMenuItem {
  name: string;
  path: string;
  sub?: SubSubMenuItem[];
}

interface MenuItem {
  value: string;
  sub: SubMenuItem[];
}

const menuMap: Record<string, MenuItem> = {
  '대학안내': {
    value: 'about',
    sub: [
      { name: '비전', path: '/about/vision' },
      {
        name: '교수진',
        path: '/about/professor/0',
        sub: [
          { name: '전체', path: '/about/professor/0', value: 0 },
          { name: '컴퓨터학부', path: '/about/professor/1', value: 1 },
          { name: '정보통신학부', path: '/about/professor/2', value: 2 },
          { name: '데이터과학부', path: '/about/professor/3', value: 3 },
          { name: '클라우드융복합', path: '/about/professor/4', value: 4 },
        ],
      },
      { name: '찾아오시는 길', path: '/about/location' },
    ],
  },
  '학과/학부': {
    value: 'departments',
    sub: [
      {
        name: '컴퓨터학부',
        path: '/departments/computer/1',
        sub: [
          { name: '컴퓨터 SW', path: '/departments/computer/1', value: 1 },
          { name: '미디어 SW', path: '/departments/computer/2', value: 2 },
        ],
      },
      {
        name: '정보통신학부',
        path: '/departments/ict/3',
        sub: [
          { name: '정보보호', path: '/departments/ict/3', value: 3 },
          { name: '정보통신', path: '/departments/ict/4', value: 4 },
        ],
      },
      {
        name: '데이터과학부',
        path: '/departments/data/5',
        sub: [
          { name: '데이터과학', path: '/departments/data/5', value: 5 },
        ],
      },
      {
        name: '클라우드융복합',
        path: '/departments/cloud/6',
        sub: [
          { name: '클라우드 ', path: '/departments/cloud/6', value: 6 }
        ],
      },
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
  const [subSubCategory, setSubSubCategory] = useState<SubSubMenuItem | null>(null);

  const [mainOpen, setMainOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [subSubOpen, setSubSubOpen] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);

    // 1. 학과/학부 경로 처리
    if (segments[0] === 'departments') {
      const mainKey = '학과/학부';
      const deptGroup = `/departments/${segments[1]}`;
      const fullPath = `/departments/${segments[1]}/${segments[2]}`;

      const subMenu = menuMap[mainKey].sub.find(item => item.path.startsWith(deptGroup));
      const subSubMenu = subMenu?.sub?.find(item => item.path === fullPath);

      setMainCategory(mainKey);
      if (subMenu) setSubCategory(subMenu);
      if (subSubMenu) setSubSubCategory(subSubMenu);
      return;
    }

    // 2. 교수진 경로 처리
    if (segments[0] === 'about' && segments[1] === 'professor') {
      const mainKey = '대학안내';
      const subMenu = menuMap[mainKey].sub.find(item => item.name === '교수진');
      const fullPath = `/about/professor/${segments[2]}`;
      const subSubMenu = subMenu?.sub?.find(item => item.path === fullPath);

      setMainCategory(mainKey);
      if (subMenu) setSubCategory(subMenu);
      if (subSubMenu) setSubSubCategory(subSubMenu);
      return;
    }

    // 3. 일반 메뉴 처리 (공지사항, 게시판 등)
    for (const [mainKey, { sub }] of Object.entries(menuMap)) {
      const exactMatch = sub.find(item => item.path === path);
      if (exactMatch) {
        setMainCategory(mainKey);
        setSubCategory(exactMatch);
        setSubSubCategory(null);
        return;
      }
      const startsWithMatch = sub.find(item => path.startsWith(item.path));
      if (startsWithMatch) {
        setMainCategory(mainKey);
        setSubCategory(startsWithMatch);
        setSubSubCategory(null);
        return;
      }
    }

    // 4. fallback
    setMainCategory(fallbackMain);
    setSubCategory(fallbackSub);
    setSubSubCategory(null);
  }, [location.pathname, defaultMainCategory, defaultSubCategoryPath]);


  const handleMainSelect = (item: string) => {
    const firstSub = menuMap[item].sub[0];
    setMainCategory(item);
    setSubCategory(firstSub);
    setSubSubCategory(null);
    setMainOpen(false);
    setSubOpen(false);
    setSubSubOpen(false);
    navigate(firstSub.path);
  };

  const handleSubSelect = (item: SubMenuItem) => {
    setSubCategory(item);
    setSubSubCategory(null);
    setMainOpen(false);
    setSubOpen(false);
    setSubSubOpen(false);
    navigate(item.path);
  };

  const handleSubSubSelect = (item: SubSubMenuItem) => {
    setSubSubCategory(item);
    setMainOpen(false);
    setSubOpen(false);
    setSubSubOpen(false);
    navigate(item.path);
  };

  const handleHome = () => {
    setMainCategory(fallbackMain);
    setSubCategory(fallbackSub);
    setSubSubCategory(null);
    setMainOpen(false);
    setSubOpen(false);
    setSubSubOpen(false);
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

        <div className="relative">
          <button
            onClick={() => {
              setMainOpen(prev => !prev);
              setSubOpen(false);
              setSubSubOpen(false);
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

        <div className="relative">
          <button
            onClick={() => {
              setSubOpen(prev => !prev);
              setMainOpen(false);
              setSubSubOpen(false);
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

        {(mainCategory === '학과/학부' || subCategory.name === '교수진') && subCategory.sub && (
          <>
            <div className="h-6 border-l border-white"></div>
            <div className="relative">
              <button
                onClick={() => {
                  setSubSubOpen(prev => !prev);
                  setMainOpen(false);
                  setSubOpen(false);
                }}
                className="pr-4 pl-4 w-[10rem] py-2 font-semibold hover:text-blue-300 text-left"
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="w-full text-center">
                    {subSubCategory ? subSubCategory.name : '학과 선택'}
                  </span>
                  <ChevronDown size={16} />
                </div>
              </button>
              {subSubOpen && (
                <ul className="absolute mt-2 w-[10rem] bg-[#244b77] rounded shadow-lg text-base z-50 text-center">
                  {subCategory.sub?.filter(item => item.name !== subSubCategory?.name).map(item => (
                    <li
                      key={item.name}
                      onClick={() => handleSubSubSelect(item)}
                      className="px-4 py-2 hover:bg-blue-600 cursor-pointer"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubHeader;