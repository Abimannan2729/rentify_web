
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { Item, ItemCategory } from '../types';
import ItemCard from '../components/items/ItemCard';
import { ITEM_CATEGORIES } from '../constants';
import { getDistanceInKm } from '../services/locationService';

const BrowsePage: React.FC = () => {
  const { items, currentUser } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<ItemCategory | 'all'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [maxDistance] = useState(10); // 10 km filter

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Search term filter
      if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      // Category filter
      if (category !== 'all' && item.category !== category) {
        return false;
      }
      // Price filter
      if (item.pricePerDay < priceRange[0] || item.pricePerDay > priceRange[1]) {
        return false;
      }
      // Distance filter
      if (currentUser) {
        const distance = getDistanceInKm(currentUser.location, item.location);
        if (distance > maxDistance) {
          return false;
        }
      } else {
        // If not logged in, show all items regardless of distance
        return true;
      }
      return true;
    });
  }, [items, searchTerm, category, priceRange, currentUser, maxDistance]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Filters Sidebar */}
      <aside className="w-full md:w-1/4 lg:w-1/5 p-6 bg-white rounded-lg shadow-md h-fit sticky top-24">
        <h2 className="text-xl font-bold mb-6">Filters</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
            <input
              id="search"
              type="text"
              placeholder="e.g., Camera, Ladder"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as ItemCategory | 'all')}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All</option>
              {ITEM_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Max Price: ${priceRange[1]}</label>
            <input
              id="price"
              type="range"
              min="0"
              max="200"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value, 10)])}
              className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          {currentUser && (
            <div className="text-sm p-3 bg-indigo-50 rounded-md text-indigo-700">
              Showing items within <strong>{maxDistance} km</strong> of your location.
            </div>
          )}
        </div>
      </aside>

      {/* Items Grid */}
      <main className="w-full md:w-3/4 lg:w-4/5">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-700">No Items Found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowsePage;
