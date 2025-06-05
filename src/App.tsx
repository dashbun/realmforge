import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WorldProvider } from './context/WorldContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

const AuthPage = lazy(() => import('./pages/AuthPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const WorldDetailPage = lazy(() => import('./pages/WorldDetailPage'));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WorldProvider>
          <Router>
            <Routes>
              <Route path="/auth" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ErrorBoundary>
                    <AuthPage />
                  </ErrorBoundary>
                </Suspense>
              } />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingSpinner />}>
                      <ErrorBoundary>
                        <DashboardPage />
                      </ErrorBoundary>
                    </Suspense>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/worlds/:worldId" 
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<LoadingSpinner />}>
                      <ErrorBoundary>
                        <WorldDetailPage />
                      </ErrorBoundary>
                    </Suspense>
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
        </WorldProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;