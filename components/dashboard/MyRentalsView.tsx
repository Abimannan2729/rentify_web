
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Rental, RentalStatus, Item } from '../../types';
import { Link } from 'react-router-dom';

const RentalCard: React.FC<{ rental: Rental, item?: Item }> = ({ rental, item }) => {
  if (!item) return null;

  const getStatusColor = (status: RentalStatus) => {
    switch (status) {
      case RentalStatus.ACTIVE: return 'bg-green-100 text-green-800';
      case RentalStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
      case RentalStatus.COMPLETED: return 'bg-blue-100 text-blue-800';
      case RentalStatus.CANCELED: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
        <div>
          <Link to={`/item/${item.id}`} className="text-lg font-semibold hover:underline">{item.name}</Link>
          <p className="text-sm text-gray-500">
            {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
          </p>
          <p className="text-sm font-bold text-gray-700">Total: ${rental.totalPrice}</p>
        </div>
      </div>
      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(rental.status)}`}>
        {rental.status}
      </span>
    </div>
  );
};

const MyRentalsView: React.FC = () => {
  const { currentUser, getRentalsByRenter, getItemById } = useAppContext();

  if (!currentUser) return null;

  const userRentals = getRentalsByRenter(currentUser.id);

  const categorizedRentals = {
    [RentalStatus.ACTIVE]: userRentals.filter(r => r.status === RentalStatus.ACTIVE),
    [RentalStatus.PENDING]: userRentals.filter(r => r.status === RentalStatus.PENDING),
    [RentalStatus.COMPLETED]: userRentals.filter(r => r.status === RentalStatus.COMPLETED),
  };
  
  if (userRentals.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">You haven't rented any items yet.</p>
        <Link to="/browse" className="mt-4 inline-block bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700">
          Browse Items to Rent
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(categorizedRentals).map(([status, rentals]) => (
        rentals.length > 0 && (
          <div key={status}>
            <h3 className="text-xl font-bold mb-4">{status} Rentals</h3>
            <div className="space-y-4">
              {rentals.map(rental => (
                <RentalCard key={rental.id} rental={rental} item={getItemById(rental.itemId)} />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default MyRentalsView;
