// src/components/Common/Header.tsx
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '@/utils/cookies';
import { logout } from '@/api/auth/logout';


const handleLogout = async () => {
  await logout(); // 쿠키 삭제 및 서버 요청
  window.location.reload(); // 상태 반영을 위해 새로고침
};

// 네비게이션 메뉴 목록
const menus = [
  {
    label: '대학안내',
    children: ['비전', '교수진', '찾아오시는 길'],
  },
  {
    label: '학과/학부',
    children: ['컴퓨터학부', '정보통신학부', '데이터과학부', '클라우드융복합'],
  },
  {
    label: '공지사항',
    children: ['학부', '대학원', '취업'],
  },
  {
    label: '게시판',
    children: ['뉴스', '학생이야기', '졸업작품'],
  },
];

export default function Header() {
  // 쿠키 기반 로그인 정보
  const isLogin = getCookie('token');
  const userName = getCookie('username');

  // 상태 관리
  const [isHovering, setIsHovering] = useState(false);           // 상단바 hover 시 하위 메뉴 표시
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);   // 모바일 메뉴 열림 여부
  const [isHidden, setIsHidden] = useState(false);               // 스크롤 시 상단바 숨김 여부
  const [lastScrollY, setLastScrollY] = useState(0);             // 마지막 스크롤 위치
  const navigate = useNavigate();

  // 스크롤 방향 감지 → 상단바 숨김 처리
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsHidden(currentY > lastScrollY && currentY > 50); // 아래로 스크롤 중이면 숨김
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
        {/* 로고 및 타이틀 */}
        <div className="flex items-center h-[48px] gap-3 z-10 relative">
          <img
            src="https://www.suwon.ac.kr/usr/images/suwon/emblem_08_2024_6.png"
            alt="로고"
            className="h-[44px] object-contain ml-0"
          />
          <div className="flex flex-col justify-center leading-[1.05] transform -translate-y-[1px]">
            <span className="text-[22px] font-extrabold text-white whitespace-nowrap mb-[8px]">
              지능형SW융합대학
            </span>
            <span className="text-[7.5px] font-semibold text-white/70 tracking-tight whitespace-nowrap">
              COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE
            </span>
          </div>
        </div>

        {/* 메뉴 리스트 */}
        {menus.map((menu, index) => (
          <div key={index} className="text-center">
            <div className="text-lg font-semibold text-white hover:text-blue-300 cursor-pointer">
              {menu.label}
            </div>
          </div>
        ))}

        {/* 로그인 / 사용자명 */}
        <div className="text-right pr-2">
          {!isLogin ? (
            <span
              onClick={() => navigate('/login')}
              className="text-sm font-semibold text-blue-700 hover:underline cursor-pointer"
            >
              로그인
            </span>
          ) : (
            <span className="text-sm font-semibold text-blue-400">
              <div>
                <span>{userName} </span>
                <span>/</span>
                <span className="cursor-pointer hover:text-blue-300" onClick={handleLogout}> logout</span>
              </div>
            </span>
          )}
        </div>
      </div>

      {/* 모바일 상단바 */}
      <div className="w-full flex items-center justify-between px-6 py-3 bg-[#0d0d1a] lg:hidden">
        <div className="flex items-center gap-3">
          <img
            src="https://www.suwon.ac.kr/usr/images/suwon/emblem_08_2024_6.png"
            alt="로고"
            className="h-10"
          />
          <span className="text-lg font-bold text-white whitespace-nowrap">지능형SW융합대학</span>
        </div>
        {/* 모바일 메뉴 토글 버튼 */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* 데스크탑 하위 메뉴 (hover 시 확장) */}
      <div
        className={`hidden lg:grid grid-cols-[1.8fr_1fr_1fr_1fr_1fr_0.8fr] w-full bg-[#0d0d1a] border-t border-white/30 transition-all duration-500 ease-in-out overflow-hidden ${isHovering ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0'
          }`}
      >
        <div></div>
        {menus.map((menu, index) => (
          <div key={index} className="text-center py-5 space-y-2 text-sm text-white/80">
            {menu.children.map((item, idx) => (
              <div key={idx} className="hover:text-blue-400 cursor-pointer whitespace-nowrap">
                {item}
              </div>
            ))}
          </div>
        ))}
        <div></div>
      </div>

      {/* 모바일 메뉴 (슬라이드 방식) */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#1a2238] border-t border-gray-200 z-40">
          <div className="p-4 space-y-4 text-white">
            {menus.map((menu, index) => (
              <div key={index}>
                <div className="font-semibold mb-2">{menu.label}</div>
                <div className="flex flex-col space-y-1 pl-4">
                  {menu.children.map((child, idx) => (
                    <span key={idx} className="text-sm hover:text-blue-300 cursor-pointer">
                      {child}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            {/* 모바일 로그인/사용자 표시 */}
            <div className="pt-4 border-t text-sm font-semibold text-right">
              {!isLogin ? (
                <span onClick={() => navigate('/login')} className="cursor-pointer hover:text-blue-300">
                  로그인
                </span>
              ) : (
                <div>
                  <span>{userName}</span>
                  <span>/</span>
                <span className="cursor-pointer hover:text-blue-300" onClick={handleLogout}> logout</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}