
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import AuthModal from '../auth/AuthModal';
import { UserIcon, LogoutIcon, LoginIcon } from '../icons/Icons';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAppContext();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navLinkClasses = "relative text-gray-600 hover:text-gray-900 transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-indigo-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100";
  const activeLinkClasses = "after:scale-x-100 text-gray-900";

  return (
    <>
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                Rentify
              </Link>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-8">
              <NavLink to="/browse" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                Browse
              </NavLink>
              <NavLink to="/list-item" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
                Post Item
              </NavLink>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <>
                  <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                    <UserIcon className="h-6 w-6 mr-1" />
                    <span>{currentUser.name}</span>
                  </Link>
                  <button onClick={logout} className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
                    <LogoutIcon className="h-6 w-6 mr-1" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button onClick={() => setIsAuthModalOpen(true)} className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  <LoginIcon className="h-5 w-5 mr-2" />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;
