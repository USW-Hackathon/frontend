import { useState } from 'react';
import ChatBot from './ChatBot';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 챗봇 UI */}
      {open && (
        <div className="fixed bottom-20 right-6 w-[380px] max-h-[1000px] bg-white border shadow-xl rounded-lg z-50 overflow-hidden mb-3">
          <ChatBot />
        </div>
      )}

      {/* 플로팅 버튼 */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="fixed bottom-6 right-6 w-14 h-14 text-white rounded-full shadow-lg z-50 flex items-center justify-center transition-all border border-gray-300 hover:bg-gray-200"
        aria-label="챗봇 열기"
      >
        <img src="/mascoat.svg" alt="챗봇 아이콘" className="w-14 h-14 object-contain" />
      </button>
    </>
  );
}
