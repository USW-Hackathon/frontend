import { useEffect, useRef, useState } from 'react';
import { fetchChatGPT } from '@/utils/fetchChatGPT';
import { gptData } from '@/utils/gptData';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
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

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: input }];

    setMessages(newMessages);
    saveMessages(newMessages);
    setInput('');
    setLoading(true);

    const fullMessages = [
      {
        role: 'system',
        content: `
너는 수원대학교 컴퓨터SW전공 정보를 안내하는 전용 챗봇이다. 아래 제공된 정보 외에는 아무것도 모른다고 가정해야 하며, 그 외 주제에 대해 대답하려 해서는 안 된다.

사용자의 질문이 아래 정보와 직접 관련이 없을 경우, 반드시 다음과 같이 응답해라:
"죄송합니다. 해당 질문은 제가 알고 있는 정보 범위를 벗어납니다."

다음은 너에게 제공된 유일한 정보다:
====================

${gptData}
====================

 이정보를 마크다운 형식으로 대답하라.
    `,
      },
      ...newMessages,
    ];

    const reply = await fetchChatGPT(fullMessages);

    let i = 0;
    typingBuffer.current = '';
    setTypingMessage('');

    const interval = setInterval(() => {
      if (i >= reply.length) {
        clearInterval(interval);
        setMessages(prev => {
          const updated = [...prev, { role: 'assistant' as const, content: reply }];
          saveMessages(updated);
          return updated;
        });
        setTypingMessage('');
        setLoading(false);
        return;
      }

      // ✅ 버퍼에 추가하고, 그걸 보여줌
      typingBuffer.current += reply[i];
      setTypingMessage(typingBuffer.current);
      i++;
    }, 30);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow ">
      <div className="h-[500px] overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded whitespace-pre-wrap ${msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}
          >
            {msg.content}
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
          disabled={loading} // 👈 여기에!
        />
        <button
          onClick={handleSend}
          disabled={loading} // 👈 여기에!
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
