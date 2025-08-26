
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import NotFoundPage from './NotFoundPage';
import RentalModal from '../components/rentals/RentalModal';
import { LocationIcon, PriceIcon, CategoryIcon } from '../components/icons/Icons';

const ItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getItemById, getUserById } = useAppContext();
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);
  
  if (!id) return <NotFoundPage />;
  const item = getItemById(id);

  if (!item) return <NotFoundPage />;
  const owner = getUserById(item.ownerId);

  return (
    <>
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative group">
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover min-h-[400px] transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all duration-300"></div>
          </div>

          {/* Details */}
          <div className="p-8 md:p-12 flex flex-col">
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{item.name}</h1>
            <p className="text-gray-500 mt-2">Owned by {owner?.name || 'Unknown'}</p>
            
            <div className="flex flex-wrap gap-4 text-sm mt-6">
              <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full"><CategoryIcon className="h-4 w-4 mr-1 text-indigo-500" /> {item.category}</div>
              <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full"><LocationIcon className="h-4 w-4 mr-1 text-indigo-500" /> {item.location.address}</div>
            </div>

            <p className="mt-6 text-gray-600 leading-relaxed flex-grow">{item.description}</p>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold">Rental Terms</h3>
              <p className="text-sm text-gray-500 mt-2">Standard rental terms apply. A security deposit may be required. Please handle the item with care and return it in the same condition.</p>
            </div>
            
            <div className="mt-8 pt-6 border-t flex items-center justify-between">
              <div className="flex items-center">
                <PriceIcon className="h-8 w-8 text-indigo-500 mr-2" />
                <div>
                  <p className="text-3xl font-bold text-gray-900">${item.pricePerDay}</p>
                  <p className="text-sm text-gray-500 -mt-1">per day</p>
                </div>
              </div>
              <button
                onClick={() => setIsRentalModalOpen(true)}
                disabled={!item.availability}
                className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none animate-glow"
              >
                {item.availability ? 'Rent Now' : 'Unavailable'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <RentalModal item={item} isOpen={isRentalModalOpen} onClose={() => setIsRentalModalOpen(false)} />
    </>
  );
};

export default ItemPage;
