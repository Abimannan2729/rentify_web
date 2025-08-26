
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ItemCard from '../components/items/ItemCard';

const HeroSection: React.FC = () => (
  <div className="relative text-center py-20 md:py-32 px-4 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl">
    <div className="absolute inset-0 bg-black opacity-30"></div>
    <div className="absolute inset-0 pattern-dots opacity-10"></div>
    <div className="relative z-10 animate-fade-in-down">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
        Rent What You Need, When You Need It
      </h1>
      <p className="text-lg md:text-xl text-indigo-200 max-w-3xl mx-auto mb-8">
        From power tools to party gear, find everything you need from people in your community.
      </p>
      <div className="flex justify-center gap-4">
        <Link 
          to="/browse"
          className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Browse Rentals
        </Link>
        <Link 
          to="/list-item"
          className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-white hover:text-indigo-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Post Your Item
        </Link>
      </div>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  const { items } = useAppContext();
  const featuredItems = items.slice(0, 4);

  return (
    <div className="space-y-12">
      <HeroSection />
      
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Featured Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
        <div className="text-center mt-8">
            <Link to="/browse" className="text-indigo-600 font-semibold hover:underline">
                View All Items &rarr;
            </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
