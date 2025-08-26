
import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../../types';
import { getDistanceInKm } from '../../services/locationService';
import { useAppContext } from '../../context/AppContext';
import { LocationIcon, PriceIcon } from '../icons/Icons';

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const { currentUser } = useAppContext();
  const distance = currentUser ? getDistanceInKm(currentUser.location, item.location).toFixed(1) : null;

  return (
    <Link to={`/item/${item.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:scale-105">
        <div className="relative">
          <img className="h-48 w-full object-cover" src={item.imageUrl} alt={item.name} />
          {!item.availability && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-lg font-bold">Unavailable</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">{item.category}</p>
          <h3 className="mt-1 text-xl font-semibold text-gray-900 leading-tight truncate">{item.name}</h3>
          <p className="mt-2 text-gray-500 text-sm h-10 overflow-hidden">{item.description}</p>
          <div className="mt-4 flex justify-between items-center">
             <p className="flex items-center text-lg font-bold text-gray-800">
                <PriceIcon className="h-5 w-5 mr-1 text-gray-500"/>
                ${item.pricePerDay}
                <span className="text-sm font-normal text-gray-500 ml-1">/day</span>
             </p>
             {distance && (
                <span className="flex items-center text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    <LocationIcon className="h-4 w-4 mr-1 text-gray-500"/>
                    {distance} km away
                </span>
             )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
