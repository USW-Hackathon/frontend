// src/pages/Location.tsx
import { useEffect, useRef } from 'react';
import Header from '../components/Common/Header';

declare global {
  interface Window {
    naver: any;
  }
}

const Location = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=vhy12tl5sj";
    script.async = true;

    script.onload = () => {
      if (!mapRef.current) return;

      const { naver } = window;

      const pathCoords = [
        [37.2141485, 126.978781],
        [37.2141015, 126.9787464],
        [37.2139893, 126.9786424],
        [37.2136032, 126.9783745],
        [37.2133249, 126.9782187],
        [37.2132246, 126.9781743],
        [37.2131434, 126.9781455],
        [37.2124892, 126.9779911],
        [37.2120443, 126.9778792],
        [37.2118285, 126.9777984],
        [37.2117969, 126.9777773],
        [37.2117074, 126.9777136],
        [37.2112697, 126.9773921],
        [37.2108253, 126.9771945],
        [37.2106999, 126.9771627],
        [37.209768, 126.9770023],
        [37.209584, 126.9769709],
        [37.2095371, 126.9769622],
        [37.209534, 126.9768822],
        [37.2094987, 126.9758164],
        [37.2094842, 126.9756046],
        [37.2094723, 126.9753601],
      ];

      const path = pathCoords.map(([lat, lng]) => new naver.maps.LatLng(lat, lng));
      const centerLatLng = path[Math.floor(path.length / 2)];

      const map = new naver.maps.Map(mapRef.current, {
        center: centerLatLng,
        zoom: 16,
      });

      // 출발지: 정문 (네이비 배경, 흰 글씨)
      new naver.maps.Marker({
        position: path[0],
        map,
        icon: {
          content: `
      <div style="
        background: white;
        color: rgb(0,54,112);
        padding: 8px 14px;
        border-radius: 20px;
        font-weight: 700;
        font-size: 14px;
        box-shadow: 0 3px 6px rgba(0,54,112,0.2);
        white-space: nowrap;
        user-select: none;
        border: 1px solid rgb(0,54,112);
      ">
        정문
      </div>
    `,
        },
      });

      // 도착지: IT대학 (옐로 배경, 네이비 글씨)
      new naver.maps.Marker({
        position: path[path.length - 1],
        map,
        icon: {
          content: `
      <div style="
        background: rgb(0,54,112);
        color: white;
        padding: 8px 14px;
        border-radius: 20px;
        font-weight: 700;
        font-size: 14px;
        box-shadow: 0 3px 6px rgba(0,54,112,0.6);
        white-space: nowrap;
        user-select: none;
      ">
        IT대학
      </div>
    `,
        },
      });
      // 경로 폴리라인 (빨간색)
      new naver.maps.Polyline({
        path,
        strokeColor: '#FF0000',
        strokeWeight: 5,
        strokeOpacity: 0.9,
        map,
      });

      // 예상 도보 시간 말풍선 (기존 하얀 배경 유지)
      new naver.maps.Marker({
        position: centerLatLng,
        map,
        icon: {
          content: `
            <div style="
              background:white;
              border-radius:12px;
              padding:6px 14px;
              font-weight:bold;
              font-size:14px;
              color:#333;
              border:1px solid #ccc;
              box-shadow:0 2px 6px rgba(0,0,0,0.2);
              user-select: none;
              white-space: nowrap;
            ">
              ⏱️ 예상 도보 시간: 약 13분
            </div>
          `,
        },
        zIndex: 1000,
      });
    };

    document.head.appendChild(script);
  }, []);

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
          <h1 className="text-5xl font-extrabold">찾아오시는 길</h1>
        </div>
      </div>

      <div className="w-full bg-[#148cb1] overflow-hidden h-20 flex items-center">
        <div className="flex animate-marquee whitespace-nowrap min-w-full">
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="text-4xl font-extrabold text-black px-20">
              COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE.
            </span>
          ))}
        </div>
      </div>

      <div className="w-full bg-white text-black">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">
            도보로 오시는 길은 아래 경로를 참고하세요.
          </h2>

          <div
            className="aspect-[3/2] w-full rounded-xl border border-gray-300 mb-8"
            ref={mapRef}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition">
              통학버스 안내
            </button>
            <button className="bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition">
              대중버스 안내
            </button>
            <button className="bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition">
              오시는 길 상세
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Location;