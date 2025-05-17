import { useEffect, useRef, useState } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState('');
  const typingBuffer = useRef('');
  const STORAGE_KEY = 'chatbot-messages';

  const saveMessages = (messages: ChatMessage[]) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  };

  const loadMessages = (): ChatMessage[] => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const stored = loadMessages();
    if (stored.length > 0) {
      setMessages(stored);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const timeNow = new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      time: timeNow,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://223.195.111.30:5062/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lastMessage: input }),
      });

      if (!res.ok) throw new Error('GPT 서버 응답 오류');

      const reply = await res.text(); // 또는 json().message 형태도 가능

      let i = 0;
      typingBuffer.current = '';
      setTypingMessage('');

      const interval = setInterval(() => {
        if (i >= reply.length) {
          clearInterval(interval);

          const assistantMessage: ChatMessage = {
            role: 'assistant',
            content: reply,
            time: new Date().toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }),
          };

          const finalMessages = [...updatedMessages, assistantMessage];
          setMessages(finalMessages);
          saveMessages(finalMessages);
          setTypingMessage('');
          setLoading(false);
          return;
        }

        typingBuffer.current += reply[i];
        setTypingMessage(typingBuffer.current);
        i++;
      }, 30);
    } catch (err) {
      console.error('GPT 호출 실패:', err);
      setTypingMessage('⚠️ GPT 응답에 실패했습니다.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <div className="h-[500px] overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className={`flex items-start gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role !== 'user' && (
                <div className="w-10 h-10 rounded-full overflow-hidden bg-transparent flex items-center justify-center">
                  <img
                    src="/mascoat.svg"
                    alt="챗봇 아이콘"
                    className="w-8 h-8 object-contain"
                  />
                </div>
              )}
              <div
                className={`p-2 rounded whitespace-pre-wrap max-w-[70%] text-left ${
                  msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'
                }`}
              >
                {msg.content}
              </div>
            </div>
            <div className="text-xs text-gray-500 pl-12">
              {msg.time}
            </div>
          </div>
        ))}
        {loading && !typingMessage && (
          <div className="p-2 rounded bg-gray-50 text-gray-400 text-sm italic">GPT 응답 생성 중...</div>
        )}
        {loading && typingMessage && (
          <div className="p-2 rounded bg-gray-100 text-left whitespace-pre-wrap">
            {typingMessage}
            <span className="animate-pulse">▍</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="border p-2 rounded flex-1"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !loading && handleSend()}
          placeholder="학교 관련 질문만 입력 가능"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          전송
        </button>
      </div>
    </div>
  );
}
