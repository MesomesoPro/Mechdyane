
import React from 'react';
import { Home, BookOpen, Trophy, User, Settings, Compass } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'my-learning', label: 'My Learning', icon: BookOpen },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 pt-20">
      <div className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-600 font-semibold' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-gray-50">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 transition-all">
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
