import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WorldProvider } from './context/WorldContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import WorldDetailPage from './pages/WorldDetailPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <WorldProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/worlds/:worldId" 
              element={
                <ProtectedRoute>
                  <WorldDetailPage />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/dashboard\" replace />} />
            <Route path="*" element={<Navigate to="/dashboard\" replace />} />
          </Routes>
        </Router>
      </WorldProvider>
    </AuthProvider>
  );
}

export default App;