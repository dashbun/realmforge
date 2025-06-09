import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../../store';
import ModernSidebar from './ModernSidebar';
import TopNavigation from './TopNavigation';
import AIAssistantPanel from '../../ai/AIAssistantPanel';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
}

const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ children }) => {
  const { sidebarOpen, currentWorld } = useAppStore();

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg dark:to-dark-surface">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-80 flex-shrink-0"
          >
            <ModernSidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <TopNavigation />

        {/* Content */}
        <main className="flex-1 overflow-hidden flex">
          {/* Primary Content */}
          <div className="flex-1 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              {children}
            </motion.div>
          </div>

          {/* AI Assistant Panel */}
          {currentWorld && (
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-96 border-l border-gray-200 dark:border-dark-border"
            >
              <AIAssistantPanel />
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default WorkspaceLayout;