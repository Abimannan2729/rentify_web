
export interface Location {
  lat: number;
  lon: number;
  address: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  location: Location;
}

export enum ItemCategory {
  TOOLS = 'Tools',
  CAMERAS = 'Cameras',
  EVENT_GEAR = 'Event Gear',
  ELECTRONICS = 'Electronics',
  SPORTS = 'Sports & Outdoors',
  HOME_GARDEN = 'Home & Garden',
}

export interface Item {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  category: ItemCategory;
  pricePerDay: number;
  imageUrl: string;
  location: Location;
  availability: boolean;
}

export enum RentalStatus {
  PENDING = 'Pending',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

export interface Rental {
  id: string;
  itemId: string;
  renterId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: RentalStatus;
}
