
import { Game, Package, Order } from './types';

export const GAMES: Game[] = [
  {
    id: 'mlbb',
    name: 'Mobile Legends: Bang Bang',
    description: 'Diamonds instantly delivered via ID',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOzRDTH14_atEG4Mo0IRaFK95Emf4MTbmKdjxx-l4Dy9O-NQv4GhSXADSryroiyVAQvTbOcKB5nmGhtWLvF2LrTazcvR7SVxO4wMNOsK41gyXI4-0ub7sv6yzhQsmt3pLsl_i9xm1Xphq5M83jt_npMVP9mV8kifJYMk0YZ0i9a0ZFZbK2W-IohAvoyKlpPfMTvhbrNQIiMlRePEiOYXEI8QftMgwCzSCtH3Z9k7b_H9Zfum4kDZ4tMO_1nR1PTUjRhZO_dKKHXBI',
    startingPrice: '4,850 MMK',
    popular: true
  },
  {
    id: 'pubg',
    name: 'PUBG Mobile',
    description: 'Unknown Cash (UC) global top up',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADtll1j8U7dvcvzerwMIDjmKX6n5BlBX36b-RkJSiKPaB1ZOBbaOGq6uw7vXULbdHJEhdvH0YBOLUQGSG79J-iVHD8UbMoJU_SZBNai0wsKqxyzBwpvbqG5A3STeq5f5uyCK8GivjkqcC33bXs6nUQX3dAKI3pq3N870jif4bJ1S0Hg9siJ-X4eOCciYRzx3tzb8DxgsB-2Gpuz2g7YQ3fCuw7vJSUanMLwHH4jk9uzmhFGocAYc9miHyy4JdhbYa6qckcsTgAxbE',
    startingPrice: '3,700 MMK'
  }
];

export const TELEGRAM_CHANNEL_URL = 'https://t.me/joegameshop1500';
export const TELEGRAM_ADMIN_URL = 'https://t.me/joe347664';

/**
 * Unified Diamond Chest image based on the Pinterest style (https://pin.it/161rM8Zo6)
 */
const MLBB_IMAGE = 'https://i.pinimg.com/736x/81/b1/4b/81b14b032d609349c2596827c1f8876c.jpg'; 

export const MLBB_PACKAGES: Package[] = [
  // Special Passes
  { id: 'ml-weekly', gameId: 'mlbb', amount: 'Weekly Diamond Pass', bonus: '210 Total Diamonds', price: 5900, currency: 'MMK', tag: 'Best Seller', image: MLBB_IMAGE },
  { id: 'ml-twilight', gameId: 'mlbb', amount: 'Twilight Pass', bonus: 'Exclusive Rewards', price: 30900, currency: 'MMK', tag: 'Premium', image: MLBB_IMAGE },
  
  // Standard Packages
  { id: 'ml1', gameId: 'mlbb', amount: '86 Diamonds', bonus: 'Instant', price: 4850, currency: 'MMK', tag: 'Small', image: MLBB_IMAGE },
  { id: 'ml2', gameId: 'mlbb', amount: '172 Diamonds', bonus: '+Bonus', price: 9700, currency: 'MMK', image: MLBB_IMAGE },
  { id: 'ml3', gameId: 'mlbb', amount: '257 Diamonds', bonus: 'Most Popular', price: 14300, currency: 'MMK', tag: 'Popular', image: MLBB_IMAGE },
  { id: 'ml4', gameId: 'mlbb', amount: '343 Diamonds', bonus: 'Fast Delivery', price: 19000, currency: 'MMK', image: MLBB_IMAGE },
  { id: 'ml5', gameId: 'mlbb', amount: '429 Diamonds', bonus: 'Best Value', price: 24000, currency: 'MMK', tag: 'Value', image: MLBB_IMAGE },
  { id: 'ml6', gameId: 'mlbb', amount: '514 Diamonds', bonus: '+Bonus', price: 28600, currency: 'MMK', image: MLBB_IMAGE },
  { id: 'ml7', gameId: 'mlbb', amount: '600 Diamonds', bonus: 'Recommended', price: 33400, currency: 'MMK', image: MLBB_IMAGE },
  { id: 'ml8', gameId: 'mlbb', amount: '706 Diamonds', bonus: 'Big Pack', price: 38500, currency: 'MMK', image: MLBB_IMAGE },
  { id: 'ml9', gameId: 'mlbb', amount: '878 Diamonds', bonus: 'Epic Bundle', price: 48200, currency: 'MMK', image: MLBB_IMAGE },
  { id: 'ml10', gameId: 'mlbb', amount: '963 Diamonds', bonus: 'Great Deal', price: 52500, currency: 'MMK', tag: 'Hot', image: MLBB_IMAGE },
  { id: 'ml11', gameId: 'mlbb', amount: '1049 Diamonds', bonus: 'Pro Pack', price: 57500, currency: 'MMK', image: MLBB_IMAGE },
  { id: 'ml12', gameId: 'mlbb', amount: '1135 Diamonds', bonus: 'Elite Bundle', price: 62500, currency: 'MMK', image: MLBB_IMAGE },
  { id: 'ml13', gameId: 'mlbb', amount: '1412 Diamonds', bonus: 'Mega Pack', price: 78000, currency: 'MMK', tag: 'Value', image: MLBB_IMAGE },
  { id: 'ml14', gameId: 'mlbb', amount: '2195 Diamonds', bonus: 'Whale Bundle', price: 120000, currency: 'MMK', image: MLBB_IMAGE },
  { id: 'ml15', gameId: 'mlbb', amount: '3688 Diamonds', bonus: 'Best Value Overall', price: 195000, currency: 'MMK', tag: 'Legendary', image: MLBB_IMAGE }
];

export const PUBG_PACKAGES: Package[] = [
  { id: 'p1', gameId: 'pubg', amount: '60 UC', bonus: 'Instant Delivery', price: 3700, currency: 'MMK' },
  { id: 'p2', gameId: 'pubg', amount: '325 UC', bonus: 'Best Seller', price: 18000, currency: 'MMK', tag: 'Most Popular' },
  { id: 'p3', gameId: 'pubg', amount: '660 UC', bonus: '+Bonus included', price: 35800, currency: 'MMK' },
  { id: 'p4', gameId: 'pubg', amount: '1800 UC', bonus: 'Special Bundle', price: 89000, currency: 'MMK', tag: 'Value' },
  { id: 'p5', gameId: 'pubg', amount: '3850 UC', bonus: 'Premium Pack', price: 178000, currency: 'MMK' },
  { id: 'p6', gameId: 'pubg', amount: '8100 UC', bonus: 'Whale Bundle', price: 350000, currency: 'MMK', tag: 'Legendary' }
];

export const ORDERS: Order[] = [
  { id: '#TX98211', service: 'Mobile Legends', serviceCode: 'ML', amount: '599 Diamonds', price: '50,000 MMK', date: 'Oct 24, 2023', time: '14:20:45', status: 'Success' },
  { id: '#TX98212', service: 'PUBG Mobile', serviceCode: 'PG', amount: '660 UC', price: '40,000 MMK', date: 'Oct 25, 2023', time: '09:15:12', status: 'Processing' },
  { id: '#TX98213', service: 'Mobile Legends', serviceCode: 'ML', amount: 'Weekly Pass', price: '8,000 MMK', date: 'Oct 26, 2023', time: '18:30:22', status: 'Failed' },
  { id: '#TX98214', service: 'PUBG Mobile', serviceCode: 'PG', amount: '1800 UC', price: '100,000 MMK', date: 'Oct 27, 2023', time: '11:10:05', status: 'Success' },
];
