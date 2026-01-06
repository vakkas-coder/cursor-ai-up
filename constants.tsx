
import { FileNode } from './types';

export const APP_NAME = "Cursor Gemini Edition";
export const VERSION = "1.0.0-beta";

export const INITIAL_FILES: FileNode[] = [
  {
    name: 'src',
    type: 'directory',
    isOpen: true,
    children: [
      {
        name: 'App.tsx',
        type: 'file',
        content: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="p-8">\n      <h1 className="text-3xl font-bold">Hello Gemini!</h1>\n      <p>Start building something amazing.</p>\n    </div>\n  );\n}`
      },
      {
        name: 'index.tsx',
        type: 'file',
        content: `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\n\nconst root = ReactDOM.createRoot(document.getElementById('root')!);\nroot.render(<App />);`
      },
      {
        name: 'styles.css',
        type: 'file',
        content: `body {\n  margin: 0;\n  font-family: sans-serif;\n  background: #121212;\n  color: white;\n}`
      }
    ]
  },
  {
    name: 'package.json',
    type: 'file',
    content: `{\n  "name": "cursor-clone",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0",\n    "tailwindcss": "^3.0.0"\n  }\n}`
  },
  {
    name: 'README.md',
    type: 'file',
    content: `# Cursor Gemini Clone\n\nWelcome to your new AI-powered IDE. Use Cmd/Ctrl+L to chat with Gemini.`
  }
];

export const UI_STRINGS = {
  chatPlaceholder: "Ask Gemini to help with your code...",
  terminalWelcome: "Welcome to Cursor Terminal v1.0.0. Node.js v20.11.0, npm v10.2.4 pre-installed.",
  noFileSelected: "Select a file to start editing",
  aiContextInfo: "Gemini is analyzing your project context..."
};
