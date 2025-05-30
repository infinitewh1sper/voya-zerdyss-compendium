import { useState, useEffect } from 'react';
import { Button, Input, InputGroup } from 'reactstrap';
import { useUser } from '@clerk/nextjs';
import { useChat } from '@/hooks/useChat';

export default function ChatBox() {
  const [message, setMessage] = useState('');
  const { user } = useUser();
  const messagesEndRef = useState<HTMLDivElement | null>(null)[1];
  const { messages, sendMessage, isLoading } = useChat();
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef) {
      messagesEndRef.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, messagesEndRef]);
  
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="border rounded-lg overflow-hidden flex flex-col h-[500px]">
      <div className="bg-gray-800 text-white p-3">
        <h3 className="m-0">Voya Zerdyss Rulebook Assistant</h3>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`mb-4 ${msg.isAI ? 'text-left' : 'text-right'}`}
          >
            <div 
              className={`inline-block max-w-[80%] rounded-lg p-3 ${
                msg.isAI 
                  ? 'bg-white text-gray-800 shadow-sm' 
                  : 'bg-blue-600 text-white'
              }`}
            >
              {msg.content}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {msg.isAI ? 'AI Assistant' : user?.fullName || 'You'} • {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="text-left mb-4">
            <div className="inline-block bg-white text-gray-800 rounded-lg p-3 shadow-sm">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef}></div>
      </div>
      
      <div className="p-3 bg-white border-t">
        <InputGroup>
          <Input
            type="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about rules, mechanics, or lore..."
            rows={2}
          />
          <Button color="primary" onClick={handleSendMessage} disabled={isLoading}>
            Send
          </Button>
        </InputGroup>
      </div>
    </div>
  );
}
