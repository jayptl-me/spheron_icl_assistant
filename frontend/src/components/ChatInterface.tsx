import React, { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import SpheronLogo from "@/components/SpheronLogo";
import { chatAPI } from "@/lib/api";

// Define the types for our chat history items
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  yaml?: string;
}

const ChatInterface: React.FC = () => {
  // State management
  const [message, setMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Ref for auto-scrolling chat
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Handle sending message
  const sendMessage = useCallback(async () => {
    if (!message.trim()) {
      setError('Message cannot be empty');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    // Add user message to chat history
    setChatHistory(prev => [...prev, { role: 'user', content: message }]);
    
    try {
      // Call the backend API using our centralized API client
      const { response: chatResponse, yaml: generatedYaml, error: apiError } = await chatAPI.sendMessage(message);
      
      if (apiError) {
        setError(apiError);
      } else {
        // Add assistant response to chat history
        setChatHistory(prev => [
          ...prev,
          { role: 'assistant', content: chatResponse, yaml: generatedYaml || undefined },
        ]);
      }
    } catch (err) {
      console.error("API Error:", err);
      // Better error handling with axios
      if (axios.isAxiosError(err)) {
        const errorMsg = err.response?.data?.error || err.message || 'Failed to connect to server';
        setError(`API Error: ${errorMsg}`);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to process message');
      }
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  }, [message]);

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Header */}
      <div className="bg-spheron-black text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <SpheronLogo className="h-8 mr-3" />
          <h2 className="text-xl font-bold">Spheron ICL Chat</h2>
        </div>
        <div className="text-sm">Powered by Qwen2.5-coder 7B</div>
      </div>
      
      {/* Chat Container */}
      <div 
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto h-[500px] bg-gray-50"
      >
        {chatHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p className="text-center">
              Ask questions about Spheron ICL or create YAML configurations
            </p>
          </div>
        ) : (
          chatHistory.map((entry, index) => (
            <div 
              key={index} 
              className={`mb-4 ${
                entry.role === 'user' 
                  ? 'bg-gray-200 ml-8 rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                  : 'bg-white mr-8 rounded-tl-lg rounded-tr-lg rounded-br-lg border border-gray-200'
              } p-4 shadow-sm`}
            >
              <div className="font-bold mb-1">
                {entry.role === 'user' ? 'You' : 'Assistant'}
              </div>
              <div className="whitespace-pre-wrap">{entry.content}</div>
              
              {/* YAML Output */}
              {entry.yaml && (
                <div className="mt-4 bg-gray-100 p-3 rounded border border-gray-300">
                  <div className="font-bold text-sm text-gray-800 mb-1">Generated YAML:</div>
                  <pre className="text-sm overflow-x-auto whitespace-pre-wrap bg-white p-3 rounded">{entry.yaml}</pre>
                </div>
              )}
            </div>
          ))
        )}
        
        {/* Error message */}
        {error && (
          <div className="p-3 mt-4 bg-red-50 border border-red-200 text-red-600 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
      
      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about ICL or generate YAML configuration..."
            className="flex-1 bg-gray-50 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            disabled={isLoading}
          />
          <Button 
            onClick={sendMessage}
            disabled={isLoading}
            className="bg-spheron-black hover:bg-gray-800 text-white"
          >
            {isLoading ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 flex justify-between">
          <span>Press Enter to send</span>
          <span>
            Responses are generated using Pinecone with llama-text-embed-v2
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
