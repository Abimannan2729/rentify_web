
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ItemCategory } from '../types';
import { ITEM_CATEGORIES } from '../constants';

const NewItemPage: React.FC = () => {
  const { addItem, currentUser } = useAppContext();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ItemCategory>(ItemCategory.TOOLS);
  const [pricePerDay, setPricePerDay] = useState('');
  const [imageUrl, setImageUrl] = useState(`https://picsum.photos/seed/${Date.now()}/800/600`);

  if (!currentUser) {
      navigate('/');
      return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !pricePerDay) {
      alert('Please fill all fields');
      return;
    }

    addItem({
      name,
      description,
      category,
      pricePerDay: parseFloat(pricePerDay),
      imageUrl,
      location: currentUser.location, // Use current user's location
      availability: true,
    });
    
    alert('Item listed successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">List Your Item</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Item Name</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select id="category" value={category} onChange={e => setCategory(e.target.value as ItemCategory)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
            {ITEM_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price per day ($)</label>
          <input type="number" id="price" value={pricePerDay} onChange={e => setPricePerDay(e.target.value)} required min="0" step="0.01" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"/>
        </div>
        <div>
            <p className="text-sm font-medium text-gray-700">Image</p>
            <div className="mt-1 flex items-center space-x-4">
                <img src={imageUrl} alt="preview" className="w-24 h-24 object-cover rounded-md" />
                <button type="button" onClick={() => setImageUrl(`https://picsum.photos/seed/${Date.now()}/800/600`)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Generate New Image
                </button>
            </div>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md shadow-md hover:bg-indigo-700 transition-colors duration-300 font-semibold">List Item</button>
      </form>
    </div>
  );
};

export default NewItemPage;
