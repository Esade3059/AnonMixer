import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Shuffle, 
  Clock, 
  Wallet, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Shuffle, label: 'Mixer', path: '/mixer' },
    { icon: Clock, label: 'Transactions', path: '/transactions' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: HelpCircle, label: 'How It Works', path: '/how-it-works' },
  ];

  return (
    <aside 
      className={`fixed md:sticky top-16 md:top-0 left-0 z-20 h-[calc(100vh-4rem)] md:h-screen transition-all duration-300 bg-dark-300/80 backdrop-blur-md border-r border-dark-200 ${
        collapsed ? 'w-16' : 'w-64'
      } md:block hidden`}
    >
      <div className="h-full flex flex-col justify-between py-6">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-2 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-500/20 text-primary-300'
                    : 'text-light-300 hover:bg-dark-200 hover:text-light-100'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              <item.icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center mx-auto w-8 h-8 rounded-full bg-dark-200 hover:bg-dark-100 text-light-300 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;