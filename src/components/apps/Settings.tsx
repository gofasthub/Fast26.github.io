import { useState } from 'react';
import {
  Monitor,
  Wifi,
  Volume2,
  Bell,
  Lock,
  User,
  Palette,
  HardDrive,
  Info,
} from 'lucide-react';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';

export function Settings() {
  const [selectedCategory, setSelectedCategory] = useState('display');
  const [notifications, setNotifications] = useState(true);
  const [autoLogin, setAutoLogin] = useState(false);
  const [brightness, setBrightness] = useState([75]);
  const [volume, setVolume] = useState([60]);

  const categories = [
    { id: 'display', name: 'Display', icon: Monitor },
    { id: 'network', name: 'Network', icon: Wifi },
    { id: 'sound', name: 'Sound', icon: Volume2 },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy & Security', icon: Lock },
    { id: 'users', name: 'Users', icon: User },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'storage', name: 'Storage', icon: HardDrive },
    { id: 'about', name: 'About', icon: Info },
  ];

  const renderContent = () => {
    switch (selectedCategory) {
      case 'display':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Display Settings</h3>
              <p className="text-sm text-gray-600 mb-4">Adjust screen brightness and resolution</p>
            </div>
            <div>
              <label className="text-sm mb-2 block">Brightness</label>
              <Slider value={brightness} onValueChange={setBrightness} max={100} step={1} />
              <div className="text-sm text-gray-600 mt-1">{brightness[0]}%</div>
            </div>
            <div>
              <label className="text-sm mb-2 block">Resolution</label>
              <select className="w-full p-2 border rounded">
                <option>1920 × 1080 (Recommended)</option>
                <option>1680 × 1050</option>
                <option>1440 × 900</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm">Night Light</div>
                <div className="text-xs text-gray-600">Reduce blue light at night</div>
              </div>
              <Switch />
            </div>
          </div>
        );

      case 'sound':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Sound Settings</h3>
              <p className="text-sm text-gray-600 mb-4">Manage audio output and volume</p>
            </div>
            <div>
              <label className="text-sm mb-2 block">Output Volume</label>
              <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
              <div className="text-sm text-gray-600 mt-1">{volume[0]}%</div>
            </div>
            <div>
              <label className="text-sm mb-2 block">Output Device</label>
              <select className="w-full p-2 border rounded">
                <option>Built-in Audio</option>
                <option>HDMI Audio</option>
                <option>USB Headphones</option>
              </select>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Notification Settings</h3>
              <p className="text-sm text-gray-600 mb-4">Control how you receive notifications</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm">Show Notifications</div>
                <div className="text-xs text-gray-600">Display notifications on desktop</div>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm">Notification Sounds</div>
                <div className="text-xs text-gray-600">Play sound when notification arrives</div>
              </div>
              <Switch />
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">Privacy & Security</h3>
              <p className="text-sm text-gray-600 mb-4">Manage your privacy and security settings</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm">Auto Login</div>
                <div className="text-xs text-gray-600">Login automatically on startup</div>
              </div>
              <Switch checked={autoLogin} onCheckedChange={setAutoLogin} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm">Screen Lock</div>
                <div className="text-xs text-gray-600">Lock screen when idle</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Change Password
              </button>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">About fast26 OS</h3>
              <p className="text-sm text-gray-600 mb-4">System information and details</p>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">OS Name</span>
                <span>fast26 OS</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Version</span>
                <span>1.0.0</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Build</span>
                <span>2025.10.22</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Kernel</span>
                <span>6.5.0-fast26</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Architecture</span>
                <span>x86_64</span>
              </div>
            </div>
            <div className="pt-4">
              <button className="px-4 py-2 border rounded hover:bg-gray-50">
                Check for Updates
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h3 className="mb-2">{categories.find(c => c.id === selectedCategory)?.name}</h3>
            <p className="text-sm text-gray-600">Settings for this category are under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r bg-gray-50 overflow-y-auto">
        <div className="p-4">
          <h2 className="mb-4">Settings</h2>
          <div className="space-y-1">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100 hover:scale-105'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span className="text-sm">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {renderContent()}
      </div>
    </div>
  );
}