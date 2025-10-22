import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Lock, Search, AlertTriangle } from 'lucide-react';

interface BrowserProps {
  triggerVirus?: () => void;
}

export function Browser({ triggerVirus }: BrowserProps) {
  const [url, setUrl] = useState('https://www.fast26os.com');
  const [inputUrl, setInputUrl] = useState(url);

  const navigate = (newUrl: string) => {
    setUrl(newUrl);
    setInputUrl(newUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`);
  };

  const handleVirusClick = () => {
    if (triggerVirus) {
      triggerVirus();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Browser Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
        <button className="p-2 rounded hover:bg-gray-200 transition-colors duration-150">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className="p-2 rounded hover:bg-gray-200 transition-colors duration-150">
          <ArrowRight className="w-4 h-4" />
        </button>
        <button className="p-2 rounded hover:bg-gray-200 transition-colors duration-150">
          <RotateCw className="w-4 h-4" />
        </button>
        <button 
          onClick={() => navigate('https://www.fast26os.com')}
          className="p-2 rounded hover:bg-gray-200 transition-colors duration-150"
        >
          <Home className="w-4 h-4" />
        </button>

        <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2 px-3 py-2 bg-white border rounded-full transition-all duration-150 focus-within:ring-2 focus-within:ring-blue-500">
          <Lock className="w-4 h-4 text-green-600" />
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-1 outline-none text-sm"
          />
          <Search className="w-4 h-4 text-gray-400" />
        </form>
      </div>

      {/* Browser Content */}
      <div className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto p-8">
          <div className="text-center mb-12">
            <h1 className="text-6xl mb-4">fast26 OS</h1>
            <p className="text-xl text-gray-600">The Modern Linux Experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md hover:scale-105 cursor-pointer">
              <h3 className="mb-2">Fast & Efficient</h3>
              <p className="text-sm text-gray-600">
                Lightning-fast performance with minimal resource usage.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md hover:scale-105 cursor-pointer">
              <h3 className="mb-2">User-Friendly</h3>
              <p className="text-sm text-gray-600">
                Intuitive interface designed for everyone.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md hover:scale-105 cursor-pointer">
              <h3 className="mb-2">Open Source</h3>
              <p className="text-sm text-gray-600">
                Free and open-source software for all.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border mb-8">
            <h2 className="mb-4">Welcome to fast26 Browser</h2>
            <p className="text-gray-600 mb-4">
              This is a demo web browser application running on fast26 OS. You can navigate to different pages,
              use the search bar, and explore the web.
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => navigate('https://github.com')}
                className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-all duration-150 hover:scale-105"
              >
                Visit GitHub
              </button>
              <button 
                onClick={() => navigate('https://fast26os.com/docs')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-150 hover:scale-105"
              >
                Documentation
              </button>
              <button 
                onClick={() => navigate('https://fast26os.com/apps')}
                className="px-4 py-2 border rounded hover:bg-gray-50 transition-all duration-150 hover:scale-105"
              >
                App Store
              </button>
            </div>
          </div>

          {/* Suspicious Ad/Link - THE VIRUS! */}
          <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 p-1 rounded-lg animate-pulse">
            <div className="bg-white p-6 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-8 h-8 text-red-500 animate-bounce" />
                <div className="flex-1">
                  <h3 className="text-red-600 mb-2 animate-pulse">🚨 URGENT: YOUR COMPUTER IS AT RISK! 🚨</h3>
                  <p className="text-sm mb-3">
                    Our advanced AI has detected <span className="font-bold text-red-600">47 VIRUSES</span> on your system!
                    Your personal data may be compromised RIGHT NOW!
                  </p>
                  <p className="text-sm mb-4 text-gray-600">
                    ⚠️ Click below to download our FREE antivirus tool and protect your fast26 OS immediately!
                  </p>
                  <button
                    onClick={handleVirusClick}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 animate-pulse text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    🛡️ DOWNLOAD FREE ANTIVIRUS NOW! 🛡️
                  </button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    * 100% FREE! * No Credit Card Required! * Trusted by 67 users!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            <p>⚠️ Warning: ts will break ur pc lol.</p>
          </div>
        </div>
      </div>
    </div>
  );
}