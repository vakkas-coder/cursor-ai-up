
import React from 'react';
import { FileNode } from '../types';

interface SidebarProps {
  files: FileNode[];
  selectedFile: string | null;
  onSelectFile: (path: string, content: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ files, selectedFile, onSelectFile }) => {
  const renderNode = (node: FileNode, path: string = '') => {
    const currentPath = `${path}/${node.name}`;
    const isSelected = selectedFile === currentPath;

    if (node.type === 'directory') {
      return (
        <div key={currentPath}>
          <div className="flex items-center gap-2 px-3 py-1 hover:bg-[#2a2d2e] cursor-pointer text-gray-400">
            <i className={`fas fa-chevron-down text-[10px]`}></i>
            <i className="fas fa-folder text-blue-400"></i>
            <span className="text-sm font-medium">{node.name}</span>
          </div>
          <div className="pl-4">
            {node.children?.map(child => renderNode(child, currentPath))}
          </div>
        </div>
      );
    }

    return (
      <div
        key={currentPath}
        onClick={() => onSelectFile(currentPath, node.content || '')}
        className={`flex items-center gap-2 px-3 py-1 hover:bg-[#2a2d2e] cursor-pointer text-sm transition-colors ${
          isSelected ? 'bg-[#37373d] text-white' : 'text-gray-400'
        }`}
      >
        <i className={`fas ${node.name.endsWith('.tsx') ? 'fa-react text-blue-300' : 'fa-file-code text-gray-500'}`}></i>
        <span>{node.name}</span>
      </div>
    );
  };

  return (
    <div className="w-64 h-full bg-[#181818] border-r border-[#2b2b2b] flex flex-col">
      <div className="p-3 text-[11px] uppercase tracking-widest text-gray-500 font-bold border-b border-[#2b2b2b]">
        Explorer
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {files.map(node => renderNode(node))}
      </div>
    </div>
  );
};

export default Sidebar;
