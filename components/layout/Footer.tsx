
import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon } from '../icons/Icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-4">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Rentify</h3>
                    <p className="text-gray-400 mt-2">Rent What You Need, When You Need It.</p>
                </div>
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon className="h-6 w-6" /></a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon className="h-6 w-6" /></a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon className="h-6 w-6" /></a>
                </div>
                <div className="border-t border-gray-700 pt-4 mt-4">
                    <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Rentify. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
