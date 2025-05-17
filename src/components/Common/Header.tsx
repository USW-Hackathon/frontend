// src/components/Common/Header.tsx
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logout } from '@/api/auth/logout';
import { getCookie } from '@/utils/cookies';
import MarqueeBanner from '@/components/MarqueeBanner';

const handleLogout = async () => {
  await logout();
  window.location.reload();
};

const menus = [
  {
    label: '대학안내',
    children: [
      { name: '비전', path: '/about/vision' },
      { name: '교수진', path: '/about/professor' },
      { name: '찾아오시는 길', path: '/about/location' },
    ],
  },
  {
    label: '학과/학부',
    children: [
      { name: '컴퓨터학부', path: '/departments/computer/1' },
      { name: '정보통신학부', path: '/departments/ict/3' },
      { name: '데이터과학부', path: '/departments/datascience/5' },
      { name: '클라우드융복합', path: '/departments/cloud/6' },
    ],
  },
  {
    label: '공지사항',
    children: [
      { name: '학부', path: '/notice/2' },
      { name: '대학원', path: '/notice/3' },
      { name: '취업', path: '/notice/1' },
    ],
  },
  {
    label: '게시판',
    children: [
      { name: '뉴스', path: '/board/1' },
      { name: '학생이야기', path: '/board/2' },
      { name: '졸업작품', path: '/board/3' },
    ],
  },
];

export default function Header() {
  const isLogin = getCookie('token');
  const userName = getCookie('username');
  const [isHovering, setIsHovering] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsHidden(currentY > lastScrollY && currentY > 50);
      setLastScrollY(currentY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* 데스크탑 상단바 */}
      <div className="hidden lg:grid grid-cols-[1.8fr_1fr_1fr_1fr_1fr_0.8fr] w-full items-center px-6 py-3 bg-[#0d0d1a]">
        {/* 로고 */}
        <div className="flex items-center h-[48px] gap-3 z-10 relative">
          <Link to="/" className="flex items-center h-[48px] gap-3 z-10 relative cursor-pointer">
            <img
              src="https://www.suwon.ac.kr/usr/images/suwon/emblem_08_2024_6.png"
              alt="로고"
              className="h-[60px] object-contain ml-0"
            />
            <div className="flex flex-col justify-center leading-[1.05] transform -translate-y-[1px]">
              <span className="text-[22px] font-extrabold text-white whitespace-nowrap mb-[8px]">지능형SW융합대학</span>
              <span className="text-[7.5px] font-semibold text-white/70 tracking-tight whitespace-nowrap">
                COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE
              </span>
            </div>
          </Link>
        </div>

        {/* 메뉴 */}
        {menus.map((menu, index) => (
          <div key={index} className="text-center">
            <div className="text-lg font-semibold text-white hover:text-blue-300 cursor-pointer">{menu.label}</div>
          </div>
        ))}

        {/* 로그인/로그아웃 */}
        <div className="text-right pr-2">
          {!isLogin ? (
            <span
              onClick={() => {
                navigate('/');
              }}
              className="text-sm font-semibold text-blue-700 hover:underline cursor-pointer"
            >
              로그인
            </span>
          ) : (
            <span className="text-sm font-semibold text-blue-400">
              <div>
                <span
                  className="cursor-pointer hover:text-blue-300"
                  onClick={() => (window.location.href = 'https://portal.suwon.ac.kr/enview/index.html')}
                >
                  {userName}
                </span>
                <span>/</span>
                <span className="cursor-pointer hover:text-blue-300" onClick={handleLogout}>
                  {' '}
                  logout
                </span>
              </div>
            </span>
          )}
        </div>
      </div>

      {/* 데스크탑 하위 메뉴 */}
      <div
        className={`hidden lg:grid grid-cols-[1.8fr_1fr_1fr_1fr_1fr_0.8fr] w-full bg-[#0d0d1a] border-t border-white/30 transition-all duration-500 ease-in-out overflow-hidden ${isHovering ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0'
          }`}
      >
        <div></div>
        {menus.map((menu, index) => (
          <div key={index} className="text-center py-5 space-y-2 text-sm text-white/80">
            {menu.children.map((item, idx) => (
              <div
                key={idx}
                className="hover:text-blue-400 cursor-pointer whitespace-nowrap"
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </div>
            ))}
          </div>
        ))}
        <div></div>
      </div>

      {/* 모바일 상단바 */}
      <div className="w-full flex items-center justify-between px-6 py-3 bg-[#0d0d1a] lg:hidden">
        <div className="flex items-center gap-3">
          <img src="https://www.suwon.ac.kr/usr/images/suwon/emblem_08_2024_6.png" alt="로고" className="h-10" />
          <span className="text-lg font-bold text-white whitespace-nowrap">지능형SW융합대학</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {
        mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#1a2238] border-t border-gray-200 z-40">
            <div className="p-4 space-y-4 text-white">
              {menus.map((menu, index) => (
                <div key={index}>
                  <div className="font-semibold mb-2">{menu.label}</div>
                  <div className="flex flex-col space-y-1 pl-4">
                    {menu.children.map((child, idx) => (
                      <span
                        key={idx}
                        className="text-sm hover:text-blue-300 cursor-pointer"
                        onClick={() => navigate(child.path)}
                      >
                        {child.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t text-sm font-semibold text-right">
                {!isLogin ? (
                  <span onClick={() => navigate('/login')} className="cursor-pointer hover:text-blue-300">
                    로그인
                  </span>
                ) : (
                  <div>
                    <span
                      className="cursor-pointer hover:text-blue-300"
                      onClick={() => (window.location.href = 'https://portal.suwon.ac.kr/enview/index.html')}
                    >
                      {userName}
                    </span>
                    <span>/</span>
                    <span className="cursor-pointer hover:text-blue-300" onClick={handleLogout}>
                      logout
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }
    </header >
  );
}
