import { useState } from "react";
import { ChevronDown } from "lucide-react";

const menus = [
  {
    label: "대학안내",
    children: ["비전", "교수진", "찾아오시는 길"],
  },
  {
    label: "학과/학부",
    children: ["컴퓨터학부", "정보통신학부", "데이터과학부", "클라우드융복합"],
  },
  {
    label: "공지사항",
    children: ["학부", "대학원", "취업"],
  },
  {
    label: "대학소식",
    children: ["뉴스", "학생이야기"],
  },
];

export default function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <header className="bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-10 py-4">
        {/* 로고 및 제목 */}
        <div className="flex items-center space-x-3">
          <img
            src="https://www.suwon.ac.kr/usr/images/suwon/emblem_08_2024_6.png"
            alt="수원대학교 로고"
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold text-blue-900">지능형SW융합대학</span>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="flex space-x-8 text-gray-800 font-medium relative">
          {menus.map((menu, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <button className="flex items-center space-x-1 hover:text-blue-600 transition duration-200">
                <span>{menu.label}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* 드롭다운 */}
              {hoveredIndex === index && (
                <ul className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg transition transform scale-95 hover:scale-100 origin-top min-w-[180px]">
                  {menu.children.map((item, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition duration-150"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
