import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Sparkles, BookOpen, Shield, Sword, Wand2 } from 'lucide-react';

const AuthPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { isAuthenticated } = useAuth();

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Hero/Promotional content */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-6">
            <Sparkles className="h-8 w-8 mr-2" />
            <h1 className="text-3xl font-bold">Realm Forge</h1>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Craft Your Imagination Into Reality
          </h2>
          
          <p className="text-indigo-100 mb-8">
            Create immersive worlds, memorable characters, and intricate power systems for your storytelling adventures.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-700 p-2 rounded-lg mt-1">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Infinite Worlds</h3>
                <p className="text-indigo-200 text-sm">Build and organize multiple worlds with unique settings and lore.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-700 p-2 rounded-lg mt-1">
                <Sword className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Deep Characters</h3>
                <p className="text-indigo-200 text-sm">Create rich, nuanced characters with detailed backgrounds and abilities.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-700 p-2 rounded-lg mt-1">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Custom Magic Systems</h3>
                <p className="text-indigo-200 text-sm">Design your own magic or power systems with rules and limitations.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-700 p-2 rounded-lg mt-1">
                <Wand2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI-Powered Assistance</h3>
                <p className="text-indigo-200 text-sm">Get suggestions and inspiration with our AI storytelling tools.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth forms */}
      <div className="md:w-1/2 p-8 md:p-12 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          {authMode === 'login' ? (
            <LoginForm 
              onSuccess={() => {}} 
              onRegisterClick={() => setAuthMode('register')} 
            />
          ) : (
            <RegisterForm 
              onSuccess={() => {}} 
              onLoginClick={() => setAuthMode('login')} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;