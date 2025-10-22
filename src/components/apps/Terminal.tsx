import { useState, useRef, useEffect } from 'react';

interface TerminalProps {
  windowId: string;
}

export function Terminal({ windowId }: TerminalProps) {
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; text: string }>>([
    { type: 'output', text: 'fast26 Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for available commands' },
  ]);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState('~');
  const [fileSystem] = useState({
    '~': ['Documents', 'Downloads', 'Pictures', 'Music', 'Videos'],
    '~/Documents': ['notes.txt', 'readme.md', 'project'],
    '~/Downloads': ['file1.pdf', 'archive.zip'],
    '~/Pictures': ['photo1.jpg', 'photo2.png'],
  });
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    setHistory(prev => [...prev, { type: 'input', text: `${currentPath} $ ${cmd}` }]);

    switch (command) {
      case 'help':
        setHistory(prev => [...prev, {
          type: 'output',
          text: `Available commands:
  help       - Show this help message
  ls         - List directory contents
  pwd        - Print working directory
  cd [dir]   - Change directory
  cat [file] - Display file contents
  echo [msg] - Print message
  clear      - Clear terminal
  date       - Show current date and time
  whoami     - Display current user
  uname      - System information`
        }]);
        break;

      case 'ls':
        const path = currentPath as keyof typeof fileSystem;
        const contents = fileSystem[path] || [];
        setHistory(prev => [...prev, {
          type: 'output',
          text: contents.length > 0 ? contents.join('  ') : 'Directory is empty'
        }]);
        break;

      case 'pwd':
        setHistory(prev => [...prev, { type: 'output', text: currentPath }]);
        break;

      case 'cd':
        if (args.length === 0 || args[0] === '~') {
          setCurrentPath('~');
        } else if (args[0] === '..') {
          const parts = currentPath.split('/');
          parts.pop();
          setCurrentPath(parts.length > 0 ? parts.join('/') || '~' : '~');
        } else {
          const newPath = currentPath === '~' ? `~/${args[0]}` : `${currentPath}/${args[0]}`;
          if (fileSystem[newPath as keyof typeof fileSystem]) {
            setCurrentPath(newPath);
          } else {
            setHistory(prev => [...prev, { type: 'output', text: `cd: ${args[0]}: No such directory` }]);
          }
        }
        break;

      case 'cat':
        if (args.length === 0) {
          setHistory(prev => [...prev, { type: 'output', text: 'cat: missing file operand' }]);
        } else {
          setHistory(prev => [...prev, {
            type: 'output',
            text: `Contents of ${args[0]}:\nThis is a sample file in the fast26 OS.\nFile system is simulated for demonstration.`
          }]);
        }
        break;

      case 'echo':
        setHistory(prev => [...prev, { type: 'output', text: args.join(' ') }]);
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'date':
        setHistory(prev => [...prev, { type: 'output', text: new Date().toString() }]);
        break;

      case 'whoami':
        setHistory(prev => [...prev, { type: 'output', text: 'user' }]);
        break;

      case 'uname':
        setHistory(prev => [...prev, { type: 'output', text: 'fast26 1.0.0 x86_64 GNU/Linux' }]);
        break;

      case '':
        break;

      default:
        setHistory(prev => [...prev, { type: 'output', text: `Command not found: ${command}` }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  return (
    <div className="h-full bg-gray-950 text-green-400 font-mono p-4 overflow-hidden flex flex-col">
      <div ref={terminalRef} className="flex-1 overflow-y-auto mb-2 space-y-1">
        {history.map((line, i) => (
          <div key={i} className={line.type === 'input' ? 'text-green-400' : 'text-green-300/80'}>
            <pre className="whitespace-pre-wrap break-words">{line.text}</pre>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-green-400">{currentPath} $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
          autoFocus
        />
      </form>
    </div>
  );
}
