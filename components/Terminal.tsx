
import React, { useState, useRef, useEffect } from 'react';
import { TerminalLine } from '../types';
import { UI_STRINGS } from '../constants';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: UI_STRINGS.terminalWelcome, type: 'output' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory: TerminalLine[] = [...history, { text: `user@cursor:~$ ${input}`, type: 'input' }];
    const cmd = input.trim().toLowerCase();

    if (cmd === 'clear') {
      setHistory([{ text: UI_STRINGS.terminalWelcome, type: 'output' }]);
      setInput('');
      return;
    }

    if (cmd === 'npm run dev') {
        newHistory.push({ text: '> cursor-clone@1.0.0 dev', type: 'output' });
        newHistory.push({ text: '> vite', type: 'output' });
        newHistory.push({ text: 'VITE v5.0.0  ready in 128 ms', type: 'success' });
        newHistory.push({ text: '➜  Local:   http://localhost:5173/', type: 'success' });
        newHistory.push({ text: '➜  Network: use --host to expose', type: 'output' });
    } else if (cmd === 'node -v') {
        newHistory.push({ text: 'v20.11.0', type: 'output' });
    } else if (cmd === 'npm -v') {
        newHistory.push({ text: '10.2.4', type: 'output' });
    } else if (cmd === 'ls') {
        newHistory.push({ text: 'src  package.json  README.md  tsconfig.json  node_modules', type: 'output' });
    } else {
        newHistory.push({ text: `sh: command not found: ${input.split(' ')[0]}`, type: 'error' });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="h-64 bg-[#0c0c0c] border-t border-[#2b2b2b] flex flex-col mono text-sm p-2 overflow-hidden">
      <div className="flex items-center justify-between px-2 py-1 text-gray-500 border-b border-[#2b2b2b] mb-2">
        <div className="flex gap-4">
            <span className="text-white border-b border-white pb-1">TERMINAL</span>
            <span>DEBUG CONSOLE</span>
            <span>OUTPUT</span>
            <span>PORTS</span>
        </div>
        <div className="flex gap-3">
            <i className="fas fa-plus cursor-pointer hover:text-white"></i>
            <i className="fas fa-trash cursor-pointer hover:text-white"></i>
            <i className="fas fa-times cursor-pointer hover:text-white"></i>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2">
        {history.map((line, i) => (
          <div key={i} className={`mb-1 whitespace-pre-wrap ${
            line.type === 'error' ? 'text-red-400' : 
            line.type === 'success' ? 'text-green-400' : 
            line.type === 'input' ? 'text-blue-300' : 'text-gray-300'
          }`}>
            {line.text}
          </div>
        ))}
        <form onSubmit={handleCommand} className="flex">
          <span className="text-green-400 mr-2">user@cursor:~$</span>
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-white border-none p-0 focus:ring-0"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;
