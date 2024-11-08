export interface MerchandiseItem {
  id: string;           // Unique identifier for the item
  name: string;         // Name of the merchandise item
  description?: string; // Optional description
  price: number;        // Price of the item
  image: string;        // Path to the item's image
  sizes?: string[];     // Optional array of available sizes
  maxQuantity: number;  // Maximum quantity that can be ordered
  type: 'clothing' | 'ticket' | 'other'; // Type of merchandise
  available: boolean;   // Whether the item is in stock/available
  category?: string;    // Optional category for grouping items
}
