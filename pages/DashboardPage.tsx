
import React, { useState } from 'react';
import MyListingsView from '../components/dashboard/MyListingsView';
import MyRentalsView from '../components/dashboard/MyRentalsView';

type DashboardTab = 'rentals' | 'listings';

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('rentals');

  const tabClasses = (tabName: DashboardTab) => 
    `px-6 py-3 text-lg font-semibold rounded-t-lg transition-colors duration-300 cursor-pointer relative ${
      activeTab === tabName 
        ? 'text-indigo-600 bg-white' 
        : 'text-gray-500 hover:text-gray-700'
    }`;
  
  const activeTabIndicator = `absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full transform transition-transform duration-300 ${activeTab === 'rentals' ? 'translate-x-0' : 'translate-x-full'}`;
    
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8">My Dashboard</h1>
      <div className="bg-gray-100 rounded-lg shadow-inner">
        {/* Tabs */}
        <div className="border-b border-gray-300 flex">
          <button onClick={() => setActiveTab('rentals')} className={tabClasses('rentals')}>My Rentals</button>
          <button onClick={() => setActiveTab('listings')} className={tabClasses('listings')}>My Listings</button>
        </div>
        <div className="relative w-1/2">
            <div className={activeTabIndicator}></div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8">
            {activeTab === 'rentals' && <MyRentalsView />}
            {activeTab === 'listings' && <MyListingsView />}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
