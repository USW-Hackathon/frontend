import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-50 bg-[#3b3b3b] text-white py-12 px-4 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        
        {/* 왼쪽: 주소 및 연락처 */}
        <div className="text-center md:text-left space-y-4 md:border-r md:pr-6 border-white">
          <div className="flex justify-center md:justify-start items-center gap-3">
            <div className="text-2xl">
              <img
                src="https://www.suwon.ac.kr/usr/images/suwon/mascot15@4x.png"
                alt="Suwon University mascot"
                className="w-20 opacity-100"
              />
            </div>
            <p>
              <span className="block">18323</span>
              경기도 화성시 봉담읍 와우안길 17<br />
              수원대학교
            </p>
          </div>
          <div className="font-bold text-lg mt-4">
            전화번호안내 <span className="text-white font-extrabold">031-220-2114</span><br />
            입학 <span className="text-white font-extrabold">031-229-8420</span>
          </div>
        </div>

        {/* 가운데: 로고 + SNS + 저작권 */}
        <div className="flex flex-col items-center space-y-4 md:px-6">
          <img
            src="https://www.suwon.ac.kr/usr/images/suwon/emblem_08_2024_6.png"
            alt="Suwon University"
            className="w-40 opacity-100"
          />
          <div className="flex gap-4 text-2xl">
            <a href="#" aria-label="Facebook">
              <img src="https://cdn-icons-png.flaticon.com/128/145/145802.png" className="w-9 opacity-100" />
            </a>
            <a href="#" aria-label="Instagram">
              <img src="https://cdn-icons-png.flaticon.com/128/3670/3670147.png" className="w-9 opacity-100" />
            </a>
            <a href="#" aria-label="YouTube">
              <img src="https://cdn-icons-png.flaticon.com/128/4138/4138124.png" className="w-9 opacity-100" />
            </a>
            <a href="#" aria-label="Chat">
              <img src="https://cdn-icons-png.flaticon.com/128/3669/3669973.png" className="w-9 opacity-100" />
            </a>
          </div>
          <p className="text-xs text-gray-400">COPYRIGHT(c) SUWON UNIVERSITY. ALL RIGHTS RESERVED.</p>
        </div>

        {/* 오른쪽: 링크 목록 */}
        <div className="text-center md:text-right space-y-2 md:border-l md:pl-6 border-white">
          <div className="flex flex-col gap-1 md:items-end">
            <a href="#" className="hover:underline">지능형 SW 융합대학</a>
            <a href="#" className="hover:underline">찾아오시는 길</a>
            <a href="#" className="hover:underline">대학안내</a>
            <a href="#" className="hover:underline">학과/학부</a>
            <a href="#" className="hover:underline">공지사항</a>
            <a href="#" className="hover:underline">게시판</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
