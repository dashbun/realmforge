import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../../store';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Globe, 
  Users, 
  Map, 
  Zap, 
  BookOpen, 
  Settings, 
  Plus,
  Crown,
  Sparkles,
  Home,
  LogOut
} from 'lucide-react';
import GlassCard from '../UI/GlassCard';
import NeuButton from '../UI/NeuButton';

const ModernSidebar: React.FC = () => {
  const { 
    currentWorld, 
    worlds, 
    activeTab, 
    setActiveTab, 
    user,
    characters,
    maps,
    powerSystems,
    lore,
    logout
  } = useAppStore();

  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      count: null,
      path: '/dashboard'
    },
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: Globe, 
      count: null,
      path: currentWorld ? `/worlds/${currentWorld.id}` : null
    },
    { 
      id: 'characters', 
      label: 'Characters', 
      icon: Users, 
      count: characters.length,
      path: currentWorld ? `/worlds/${currentWorld.id}?tab=characters` : null
    },
    { 
      id: 'maps', 
      label: 'Maps', 
      icon: Map, 
      count: maps.length,
      path: currentWorld ? `/worlds/${currentWorld.id}?tab=maps` : null
    },
    { 
      id: 'powers', 
      label: 'Power Systems', 
      icon: Zap, 
      count: powerSystems.length,
      path: currentWorld ? `/worlds/${currentWorld.id}?tab=powers` : null
    },
    { 
      id: 'lore', 
      label: 'Lore', 
      icon: BookOpen, 
      count: lore.length,
      path: currentWorld ? `/worlds/${currentWorld.id}?tab=lore` : null
    },
  ];

  const handleNavigation = (item: typeof navigationItems[0]) => {
    if (!item.path) return;
    
    if (item.id === 'dashboard') {
      navigate('/dashboard');
    } else if (item.id === 'overview') {
      navigate(item.path);
    } else {
      navigate(item.path);
      setActiveTab(item.id);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const isActive = (item: typeof navigationItems[0]) => {
    if (item.id === 'dashboard') {
      return location.pathname === '/dashboard';
    }
    if (item.id === 'overview') {
      return location.pathname.includes('/worlds/') && !location.search.includes('tab=');
    }
    return location.search.includes(`tab=${item.id}`);
  };

  return (
    <div className="h-full bg-white/10 dark:bg-dark-surface/10 backdrop-blur-xl border-r border-white/20 dark:border-dark-border/20 flex flex-col">
      <div className="p-6 flex-1">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8 cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Realm Forge</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">World Builder</p>
          </div>
        </motion.div>

        {/* Current World */}
        {currentWorld && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <GlassCard className="p-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-12 rounded-lg bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${currentWorld.imageUrl || 'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg'})` 
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {currentWorld.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate capitalize">
                    {currentWorld.genre}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Navigation */}
        <nav className="space-y-2">
          {navigationItems.map((item, index) => {
            const disabled = item.id !== 'dashboard' && !currentWorld;
            
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleNavigation(item)}
                disabled={disabled}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive(item)
                    ? 'bg-primary-500 text-white shadow-lg'
                    : disabled
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-dark-elevated/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count !== null && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    isActive(item)
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 dark:bg-dark-elevated text-gray-600 dark:text-gray-400'
                  }`}>
                    {item.count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8 space-y-3">
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Quick Actions
          </h4>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-primary text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Create New</span>
          </motion.button>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-t border-white/10 dark:border-dark-border/10">
        <GlassCard className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 dark:text-white truncate">
                {user?.username}
              </p>
              <div className="flex items-center space-x-1">
                {user?.subscription === 'premium' && (
                  <Crown className="h-3 w-3 text-yellow-500" />
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {user?.subscription}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ModernSidebar;