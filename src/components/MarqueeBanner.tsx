import React from 'react';

const MarqueeBanner = () => {
  const message = 'COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE.';

  return (
    <>
      <div className="bg-[#148cb1] overflow-hidden h-20 flex items-center">
        <div className="marquee-track">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="text-4xl font-extrabold text-black pr-24"
            >
              {message}&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          display: inline-flex;
          white-space: nowrap;
          will-change: transform;
          animation: marquee 60s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
};

export default MarqueeBanner;
