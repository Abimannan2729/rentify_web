
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const MyListingsView: React.FC = () => {
  const { currentUser, getItemsByOwner } = useAppContext();
  
  if (!currentUser) return null;

  const userListings = getItemsByOwner(currentUser.id);

  if (userListings.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">You haven't listed any items yet.</p>
        <Link to="/list-item" className="mt-4 inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700">
          List Your First Item
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {userListings.map(item => (
        <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">${item.pricePerDay}/day</p>
            </div>
          </div>
          <div>
            <Link to={`/item/${item.id}`} className="text-sm text-indigo-600 hover:underline">View</Link>
            {/* In a full app, Edit/Delete buttons would go here */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyListingsView;
