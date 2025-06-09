import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import WorldDetailPage from './pages/WorldDetailPage';
import WorkspaceLayout from './components/core/Layout/WorkspaceLayout';

function App() {
  const { isAuthenticated } = useAppStore();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg dark:to-dark-surface">
        <Routes>
          <Route 
            path="/auth" 
            element={
              isAuthenticated ? <Navigate to="/dashboard\" replace /> : <AuthPage />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <WorkspaceLayout>
                  <DashboardPage />
                </WorkspaceLayout>
              ) : (
                <Navigate to="/auth" replace />
              )
            } 
          />
          <Route 
            path="/worlds/:worldId" 
            element={
              isAuthenticated ? (
                <WorkspaceLayout>
                  <WorldDetailPage />
                </WorkspaceLayout>
              ) : (
                <Navigate to="/auth" replace />
              )
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} replace />} 
          />
          <Route 
            path="*" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/auth"} replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;