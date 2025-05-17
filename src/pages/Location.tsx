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
  <a
    href="https://www.suwon.ac.kr/index.html?menuno=674&bbsno=87280&boardno=667&siteno=37&act=view"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition text-center flex items-center justify-center"
  >
    통학버스 안내
  </a>
  <a
    href="https://www.suwon.ac.kr/index.html?menuno=656"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition text-center flex items-center justify-center"
  >
   대중버스 안내
  </a>
  <a
    href="https://map.naver.com/p/directions/-/14134807.9282046,4468405.2235878,%EC%88%98%EC%9B%90%EB%8C%80%ED%95%99%EA%B5%90IT%EB%8C%80%ED%95%99,31631663,PLACE_POI/-/transit?c=15.00,0,0,0,dh"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition text-center flex items-center justify-center"
  >
    오시는 길 상세
  </a>
</div>

        </div>
      </div>
      {/* 캠퍼스 안내 및 연락처 */}
<div className="w-full bg-white text-black border-t border-gray-200">
  <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
    
    {/* 주소 및 연락처 */}
    <div className="flex items-start gap-4">
      <div className="text-blue-500 text-3xl">
        <img src="https://cdn-icons-png.flaticon.com/128/684/684908.png" alt="주소 아이콘" className="w-8 h-8 mt-1" />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">주소 및 연락처</h3>
        <p className="text-sm leading-relaxed text-gray-700">
          경기 화성시 봉담읍 와우안길 17 수원대학교 지능형 SW 융합대학<br />
          연락처 : 031-229-8352
        </p>
      </div>
    </div>
        {/* 승용차 이용 시 안내 */}
<div className="mt-12 space-y-8">
  <h3 className="text-xl font-bold text-black flex items-center gap-2">
    <img src="https://cdn-icons-png.flaticon.com/128/854/854878.png" alt="승용차 아이콘" className="w-6 h-6" />
    승용차 이용 시
  </h3>

  <div className="space-y-6 text-sm leading-relaxed text-gray-700">
    <div>
      <p className="font-semibold text-blue-800">● 수원역 → 오산방면 → 세평지하차도진입 → 우회전 → 오목천삼거리 좌회전 → 한국농업전문학교 → 수원대학교</p>
    </div>
<br />
    <div>
      <p className="font-bold">· A코스 (의왕·과천고속도로 이용)</p>
      <p>사당동 → 봉담IC → 남수원방면 → 한국농업전문학교 → 수원대학교</p>
    </div>
    <div>
      <p className="font-bold">· B코스 (경부고속도로 이용)</p>
      <p>수원IC → 터미널사거리 → 병점육교 → 융건릉 → 수원대학교</p>
    </div>
    <div>
      <p className="font-bold">· C코스 (경부고속도로 이용)</p>
      <p>동탄JC → 정남IC → 수원과학대 → 수원대학교</p>
    </div>
    <div>
      <p className="font-bold">· D코스 (1번국도 이용)</p>
      <p>영등포 → 안양 → 의왕 → 북수원I.C(봉담,발안방면) → 봉담I.C(좌회전) → 수영사거리 → 한국농업전문학교 → 수원대학교</p>
    </div>
<br /><br />
    <div>
      <p className="font-bold">· A코스</p>
      <p>분당(이매사거리) → 판교IC → 판교JC(서울외곽순환도로 일산방면) → 청계톨게이트통과 → 학의분기점 → 과천.봉담간 고속화도로 봉담방면 → 봉담IC → 한국농업전문학교 → 수원대학교</p>
    </div>
    <div>
      <p className="font-bold">· B코스</p>
      <p>풍덕천 → 수원동문(창용문) → 수원남문(팔달문) → 수원역 → 수원대학교</p>
    </div>
<br /><br />
    <div>
      <p className="font-bold">· A코스</p>
      <p>동암역 → 만수동 → 서해안고속도로 → 비봉IC → 수원방면 → 오목천삼거리(우회전) → 한국농업전문학교 → 수원대학교</p>
    </div>
    <div>
      <p className="font-bold">· B코스</p>
      <p>동암역 → 만수동 → 신갈.안산고속도로 → 반월IC(군포.산본) → 수인산업도로(수원방면) → 서수원I.C → 봉담IC(예상시간 50분) → 한국농업전문학교 → 수원대학교</p>
    </div>
    <div>
      <p className="font-bold">· C코스</p>
      <p>동암역 → 만수동 → 수인산업도로 → 서수원I.C → 봉담IC → 한국농업전문학교 → 수원대학교 (예상시간 55분)</p>
    </div>
    <br />  <br />
  </div>
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