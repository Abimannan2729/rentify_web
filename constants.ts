
import { User, Item, Rental, ItemCategory, RentalStatus } from './types';

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: 'user1',
    name: 'Alice',
    email: 'alice@example.com',
    location: { lat: 34.0522, lon: -118.2437, address: 'Los Angeles, CA' },
  },
  {
    id: 'user2',
    name: 'Bob',
    email: 'bob@example.com',
    location: { lat: 34.0600, lon: -118.2500, address: 'Echo Park, Los Angeles' },
  },
   {
    id: 'user3',
    name: 'Charlie',
    email: 'charlie@example.com',
    location: { lat: 40.7128, lon: -74.0060, address: 'New York, NY' },
  }
];

// Mock Items
export const MOCK_ITEMS: Item[] = [
  {
    id: 'item1',
    ownerId: 'user2',
    name: 'Professional DSLR Camera',
    description: 'High-end Canon EOS 5D Mark IV. Perfect for professional photography and videography. Comes with a 24-70mm lens.',
    category: ItemCategory.CAMERAS,
    pricePerDay: 50,
    imageUrl: 'https://picsum.photos/seed/camera/800/600',
    location: { lat: 34.055, lon: -118.245, address: 'Downtown LA' }, // ~3-4 km from user1
    availability: true,
  },
  {
    id: 'item2',
    ownerId: 'user2',
    name: 'Heavy-Duty Ladder',
    description: 'A 12-foot extension ladder, great for painting, construction, or home projects. Sturdy and reliable.',
    category: ItemCategory.TOOLS,
    pricePerDay: 15,
    imageUrl: 'https://picsum.photos/seed/ladder/800/600',
    location: { lat: 34.065, lon: -118.26, address: 'Westlake, LA' }, // ~ 2 km from user1
    availability: true,
  },
  {
    id: 'item3',
    ownerId: 'user1',
    name: 'Portable PA System',
    description: 'All-in-one PA system with two speakers, a mixer, and microphones. Ideal for parties, small concerts, or public speaking events.',
    category: ItemCategory.EVENT_GEAR,
    pricePerDay: 75,
    imageUrl: 'https://picsum.photos/seed/pasystem/800/600',
    location: { lat: 34.053, lon: -118.244, address: 'Civic Center, LA' }, // ~ 0.1 km from user1
    availability: true,
  },
  {
    id: 'item4',
    ownerId: 'user3',
    name: 'Electric Hedge Trimmer',
    description: 'Powerful and lightweight hedge trimmer to keep your garden looking sharp. Long extension cord included.',
    category: ItemCategory.HOME_GARDEN,
    pricePerDay: 20,
    imageUrl: 'https://picsum.photos/seed/trimmer/800/600',
    location: { lat: 40.7128, lon: -74.0060, address: 'New York, NY' }, // far from user1
    availability: true,
  },
  {
    id: 'item5',
    ownerId: 'user2',
    name: 'High-Performance Drone',
    description: 'DJI Mavic Air 2 with 4K camera. Capture stunning aerial footage. Easy to fly, great for beginners and pros.',
    category: ItemCategory.ELECTRONICS,
    pricePerDay: 60,
    imageUrl: 'https://picsum.photos/seed/drone/800/600',
    location: { lat: 34.048, lon: -118.25, address: 'South Park, LA' }, // ~1-2km from user1
    availability: true,
  },
  {
    id: 'item6',
    ownerId: 'user2',
    name: 'Camping Tent for 4',
    description: 'Spacious and weatherproof tent that comfortably sleeps 4 people. Perfect for a weekend getaway.',
    category: ItemCategory.SPORTS,
    pricePerDay: 25,
    imageUrl: 'https://picsum.photos/seed/tent/800/600',
    location: { lat: 34.1, lon: -118.3, address: 'Hollywood, LA' }, // ~8-9 km from user1
    availability: false,
  },
];

// Mock Rentals
export const MOCK_RENTALS: Rental[] = [
    {
        id: 'rental1',
        itemId: 'item3',
        renterId: 'user2',
        ownerId: 'user1',
        startDate: '2024-07-10',
        endDate: '2024-07-12',
        totalPrice: 150,
        status: RentalStatus.COMPLETED,
    },
    {
        id: 'rental2',
        itemId: 'item1',
        renterId: 'user1',
        ownerId: 'user2',
        startDate: '2024-08-01',
        endDate: '2024-08-03',
        totalPrice: 150,
        status: RentalStatus.ACTIVE,
    },
    {
        id: 'rental3',
        itemId: 'item2',
        renterId: 'user1',
        ownerId: 'user2',
        startDate: '2024-08-15',
        endDate: '2024-08-16',
        totalPrice: 30,
        status: RentalStatus.PENDING,
    }
];

export const ITEM_CATEGORIES = Object.values(ItemCategory);
