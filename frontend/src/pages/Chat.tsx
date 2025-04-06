import React from 'react';
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import SpheronLogo from "@/components/SpheronLogo";

const Chat = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <SpheronLogo className="h-8 mr-3" />
              <span className="text-xl font-bold text-spheron-black">Spheron ICL</span>
            </div>
            
            <Button variant="outline" asChild size="sm">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <header className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-center mb-6">Spheron ICL Chatbot</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Ask questions about Spheron ICL or generate deployment YAML configurations to accelerate your projects.
          </p>
        </header>
        
        <div className="max-w-4xl mx-auto">
          <ChatInterface />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-spheron-dark text-white py-4 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>Powered by Qwen2.5-coder 7B and Pinecone with llama-text-embed-v2</p>
          <p className="mt-1 text-gray-400">© 2025 Spheron ICL Chatbot - Hackathon Project</p>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
