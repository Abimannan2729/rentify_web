
import React, { useState, useMemo } from 'react';
import { Item, RentalStatus } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { CalendarIcon } from '../icons/Icons';

interface RentalModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item;
}

const RentalModal: React.FC<RentalModalProps> = ({ isOpen, onClose, item }) => {
  const { currentUser, addRental } = useAppContext();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const totalPrice = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) return 0;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * item.pricePerDay;
  }, [startDate, endDate, item.pricePerDay]);

  const handleConfirmRental = () => {
    if (!currentUser) {
      alert('Please log in to rent an item.');
      return;
    }
    if (totalPrice <= 0) {
      alert('Please select valid start and end dates.');
      return;
    }

    addRental({
      itemId: item.id,
      renterId: currentUser.id,
      ownerId: item.ownerId,
      startDate,
      endDate,
      totalPrice,
      status: RentalStatus.PENDING,
    });
    
    alert('Rental request sent!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-center mb-4">Rent: {item.name}</h2>
        
        {!currentUser ? (
          <div className="text-center p-6 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 font-semibold">You must be logged in to rent an item.</p>
            <p className="text-red-600 text-sm mt-2">Please close this window and log in via the navigation bar.</p>
          </div>
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input type="date" id="start-date" value={startDate} onChange={e => setStartDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Date</label>
                <input type="date" id="end-date" value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate || new Date().toISOString().split('T')[0]} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-md text-center">
              <p className="text-gray-600">Total Price</p>
              <p className="text-3xl font-extrabold text-indigo-600">${totalPrice.toFixed(2)}</p>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
              <button type="button" onClick={handleConfirmRental} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2"/>
                Confirm Rental
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RentalModal;
