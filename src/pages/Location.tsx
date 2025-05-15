import { useEffect, useRef } from 'react';


declare global {
  interface Window {
    kakao: any;
  }
}

const kakao = window.kakao;


const Location = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=cbf93dee84248d14d730b6efb90c1404&autoload=false`;
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      kakao.maps.load(() => {
        const container = mapRef.current;
        const options = {
          center: new kakao.maps.LatLng(37.20996656194817, 126.97525243855237),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);

        const markerPosition = new kakao.maps.LatLng(37.20996656194817, 126.97525243855237);
        new kakao.maps.Marker({
          position: markerPosition,
          map: map,
        });
      });
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div className="w-full flex flex-col items-center px-4 py-12 bg-white">
      <h2 className="text-3xl font-bold mb-6">찾아오시는 길</h2>

      {/* 지도 */}
      <div
        ref={mapRef}
        id="map"
        className="w-full max-w-5xl h-96 rounded-xl border border-gray-300"
      ></div>

      {/* 버튼 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
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
  );
};

export default Location;
