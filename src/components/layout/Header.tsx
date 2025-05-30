import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWorlds } from '../../context/WorldContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import { Menu, X, Globe, Compass, User, LogOut, Book, Wand2 } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { currentWorld } = useWorlds();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <header className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation('/dashboard')}
          >
            <Globe className="h-8 w-8" />
            <span className="text-2xl font-bold">Realm Forge</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {user && (
              <>
                <button 
                  onClick={() => handleNavigation('/dashboard')}
                  className="text-white hover:text-indigo-200 flex items-center"
                >
                  <Globe className="h-5 w-5 mr-1" />
                  <span>Worlds</span>
                </button>
                {currentWorld && (
                  <>
                    <button 
                      onClick={() => handleNavigation(`/worlds/${currentWorld.id}?tab=characters`)}
                      className="text-white hover:text-indigo-200 flex items-center"
                    >
                      <User className="h-5 w-5 mr-1" />
                      <span>Characters</span>
                    </button>
                    <button 
                      onClick={() => handleNavigation(`/worlds/${currentWorld.id}?tab=maps`)}
                      className="text-white hover:text-indigo-200 flex items-center"
                    >
                      <Compass className="h-5 w-5 mr-1" />
                      <span>Maps</span>
                    </button>
                    <button 
                      onClick={() => handleNavigation(`/worlds/${currentWorld.id}?tab=powers`)}
                      className="text-white hover:text-indigo-200 flex items-center"
                    >
                      <Wand2 className="h-5 w-5 mr-1" />
                      <span>Powers</span>
                    </button>
                    <button 
                      onClick={() => handleNavigation(`/worlds/${currentWorld.id}?tab=lore`)}
                      className="text-white hover:text-indigo-200 flex items-center"
                    >
                      <Book className="h-5 w-5 mr-1" />
                      <span>Lore</span>
                    </button>
                  </>
                )}
              </>
            )}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="block text-indigo-200">Welcome,</span>
                  <span className="font-semibold">{user.username}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<LogOut className="h-4 w-4" />}
                  onClick={handleLogout}
                  className="border-indigo-300 text-indigo-100 hover:bg-indigo-800"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigation('/auth')}
                className="border-indigo-300 text-indigo-100 hover:bg-indigo-800"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-800">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3 pb-3">
              {user && (
                <>
                  <button 
                    onClick={() => handleNavigation('/dashboard')}
                    className="text-white hover:text-indigo-200 flex items-center py-2"
                  >
                    <Globe className="h-5 w-5 mr-2" />
                    <span>Worlds</span>
                  </button>
                  {currentWorld && (
                    <>
                      <button 
                        onClick={() => handleNavigation(`/worlds/${currentWorld.id}?tab=characters`)}
                        className="text-white hover:text-indigo-200 flex items-center py-2"
                      >
                        <User className="h-5 w-5 mr-2" />
                        <span>Characters</span>
                      </button>
                      <button 
                        onClick={() => handleNavigation(`/worlds/${currentWorld.id}?tab=maps`)}
                        className="text-white hover:text-indigo-200 flex items-center py-2"
                      >
                        <Compass className="h-5 w-5 mr-2" />
                        <span>Maps</span>
                      </button>
                      <button 
                        onClick={() => handleNavigation(`/worlds/${currentWorld.id}?tab=powers`)}
                        className="text-white hover:text-indigo-200 flex items-center py-2"
                      >
                        <Wand2 className="h-5 w-5 mr-2" />
                        <span>Powers</span>
                      </button>
                      <button 
                        onClick={() => handleNavigation(`/worlds/${currentWorld.id}?tab=lore`)}
                        className="text-white hover:text-indigo-200 flex items-center py-2"
                      >
                        <Book className="h-5 w-5 mr-2" />
                        <span>Lore</span>
                      </button>
                    </>
                  )}
                </>
              )}
            </nav>
            
            {user && (
              <div className="pt-3 border-t border-indigo-700">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="block text-indigo-200">Logged in as</span>
                    <span className="font-semibold">{user.username}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<LogOut className="h-4 w-4" />}
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="border-indigo-300 text-indigo-100 hover:bg-indigo-800"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;