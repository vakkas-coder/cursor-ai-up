
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Terminal from './components/Terminal';
import AIChat from './components/AIChat';
import { INITIAL_FILES, APP_NAME } from './constants';
import { FileNode } from './types';

const App: React.FC = () => {
  const [files, setFiles] = useState<FileNode[]>(INITIAL_FILES);
  const [currentFile, setCurrentFile] = useState<{ path: string; content: string } | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);

  const handleSelectFile = (path: string, content: string) => {
    setCurrentFile({ path, content });
  };

  const handleUpdateContent = (newContent: string) => {
    if (currentFile) {
      setCurrentFile({ ...currentFile, content: newContent });
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#1e1e1e] text-[#cccccc]">
      {/* Activity Bar */}
      <div className="w-12 h-full bg-[#333333] flex flex-col items-center py-4 gap-6 border-r border-[#1a1a1a]">
        <div className="text-xl text-white opacity-90 cursor-pointer">
            <i className="fas fa-copy"></i>
        </div>
        <div className="text-xl text-gray-500 hover:text-white cursor-pointer">
            <i className="fas fa-search"></i>
        </div>
        <div className="text-xl text-gray-500 hover:text-white cursor-pointer">
            <i className="fas fa-code-branch"></i>
        </div>
        <div className="text-xl text-gray-500 hover:text-white cursor-pointer">
            <i className="fas fa-play"></i>
        </div>
        <div className="text-xl text-gray-500 hover:text-white cursor-pointer">
            <i className="fas fa-puzzle-piece"></i>
        </div>
        <div className="mt-auto flex flex-col gap-6 items-center">
            <i className="fas fa-user-circle text-xl text-gray-500 cursor-pointer"></i>
            <i className="fas fa-cog text-xl text-gray-500 cursor-pointer"></i>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 flex min-h-0">
          <Sidebar 
            files={files} 
            selectedFile={currentFile?.path || null} 
            onSelectFile={handleSelectFile} 
          />
          
          <main className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
            <Editor 
              content={currentFile?.content || ''} 
              filePath={currentFile?.path || null} 
              onSave={handleUpdateContent}
            />
            {isTerminalOpen && <Terminal />}
          </main>
          
          <AIChat currentCode={currentFile?.content || ''} />
        </div>
      </div>
    </div>
  );
};

export default App;
