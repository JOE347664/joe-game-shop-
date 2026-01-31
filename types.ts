
export interface Game {
  id: string;
  name: string;
  description: string;
  image: string;
  startingPrice: string;
  popular?: boolean;
}

export interface Package {
  id: string;
  gameId: string;
  amount: string;
  bonus: string;
  price: number;
  currency: string;
  tag?: string;
  image?: string;
}

export interface Order {
  id: string;
  service: string;
  serviceCode: string;
  amount: string;
  price: string;
  date: string;
  time: string;
  status: 'Success' | 'Processing' | 'Failed';
}

export interface User {
  name: string;
  id: string;
  avatar: string;
  telegramUsername?: string;
  isConnected: boolean;
}

export type View = 'home' | 'mlbb-diamonds' | 'pubg-uc' | 'checkout' | 'history' | 'support';
