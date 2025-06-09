import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../../store';
import { 
  Menu, 
  Search, 
  Bell, 
  Share2, 
  Save, 
  Undo, 
  Redo,
  Users,
  Crown
} from 'lucide-react';
import NeuButton from '../UI/NeuButton';

const TopNavigation: React.FC = () => {
  const { 
    sidebarOpen, 
    setSidebarOpen, 
    currentWorld, 
    user 
  } = useAppStore();

  return (
    <header className="h-16 bg-white/10 dark:bg-dark-surface/10 backdrop-blur-xl border-b border-white/20 dark:border-dark-border/20">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <NeuButton
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </NeuButton>

          {currentWorld && (
            <div className="flex items-center space-x-3">
              <div className="h-6 w-px bg-gray-300 dark:bg-dark-border" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentWorld.name}
              </h2>
              <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full">
                {currentWorld.genre}
              </span>
            </div>
          )}
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search your world..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 dark:bg-dark-elevated/50 border border-white/20 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <NeuButton variant="ghost" size="sm">
              <Undo className="h-4 w-4" />
            </NeuButton>
            <NeuButton variant="ghost" size="sm">
              <Redo className="h-4 w-4" />
            </NeuButton>
            <NeuButton variant="ghost" size="sm">
              <Save className="h-4 w-4" />
            </NeuButton>
          </div>

          <div className="h-6 w-px bg-gray-300 dark:bg-dark-border" />

          {/* Collaboration */}
          {currentWorld && (
            <NeuButton variant="ghost" size="sm">
              <Users className="h-4 w-4" />
              <span className="ml-2 text-sm">Collaborate</span>
            </NeuButton>
          )}

          {/* Share */}
          {currentWorld && (
            <NeuButton variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </NeuButton>
          )}

          {/* Notifications */}
          <NeuButton variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </NeuButton>

          {/* User Menu */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 px-3 py-2 bg-white/10 dark:bg-dark-elevated/50 rounded-xl cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            {user?.subscription === 'premium' && (
              <Crown className="h-4 w-4 text-yellow-500" />
            )}
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;