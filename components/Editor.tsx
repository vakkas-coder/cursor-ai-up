
import React, { useState, useEffect } from 'react';

interface EditorProps {
  content: string;
  filePath: string | null;
  onSave: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, filePath, onSave }) => {
  const [localContent, setLocalContent] = useState(content);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  if (!filePath) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#1e1e1e] text-gray-500 flex-col gap-4">
        <i className="fas fa-code text-6xl opacity-20"></i>
        <p>Select a file from the sidebar to start editing</p>
        <div className="text-xs text-gray-600 flex flex-col items-center">
            <span>Press <kbd className="bg-[#333] px-1 rounded">Cmd+L</kbd> for AI Chat</span>
            <span>Press <kbd className="bg-[#333] px-1 rounded">Ctrl+`</kbd> for Terminal</span>
        </div>
      </div>
    );
  }

  const lines = localContent.split('\n');

  return (
    <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden">
      <div className="h-9 bg-[#252526] flex items-center px-4 border-b border-[#1a1a1a]">
        <div className="text-xs text-gray-400 flex items-center gap-2">
          <i className="fas fa-file-code"></i>
          {filePath.split('/').pop()}
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden relative">
        <div className="w-12 bg-[#1e1e1e] border-r border-[#2b2b2b] text-right pr-3 pt-4 text-xs text-gray-600 select-none mono">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          className="flex-1 bg-transparent text-[#d4d4d4] p-4 outline-none resize-none mono leading-relaxed"
          spellCheck={false}
          value={localContent}
          onChange={(e) => {
            setLocalContent(e.target.value);
            onSave(e.target.value);
          }}
        />
      </div>
      <div className="h-6 bg-[#007acc] text-white text-[10px] flex items-center px-4 justify-between">
        <div>TypeScript JSX</div>
        <div className="flex gap-4">
          <span>UTF-8</span>
          <span>Spaces: 2</span>
        </div>
      </div>
    </div>
  );
};

export default Editor;
