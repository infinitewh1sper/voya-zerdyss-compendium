import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRoomEvent } from '@/lib/collaboration/liveblocks';

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isAI?: boolean;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  
  // Listen for chat events from other users
  useRoomEvent(({ event, user: eventUser }) => {
    if (event.type === 'chat') {
      const newMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sender: eventUser?.name || 'Anonymous',
        content: event.message,
        timestamp: new Date(),
        isAI: false
      };
      
      setMessages(prev => [...prev, newMessage]);
    }
  });
  
  // Send a message to the AI assistant
  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message to the chat
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: user?.fullName || 'You',
      content,
      timestamp: new Date(),
      isAI: false
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call an API endpoint
      // that connects to a GPT model with the rulebook content
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }
      
      const data = await response.json();
      
      // Add AI response to the chat
      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'AI Assistant',
        content: data.response,
        timestamp: new Date(),
        isAI: true
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message to AI:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        sender: 'System',
        content: 'Sorry, I encountered an error processing your request. Please try again later.',
        timestamp: new Date(),
        isAI: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    messages,
    sendMessage,
    isLoading
  };
}
