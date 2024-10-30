import { MerchandiseItem } from './merchandise-item';

export class MerchandiseItemModel implements MerchandiseItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  sizes?: string[];
  maxQuantity: number;
  type: 'clothing' | 'ticket' | 'other';
  available: boolean;
  category?: string;

  constructor(data: MerchandiseItem) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.image = data.image;
    this.sizes = data.sizes;
    this.maxQuantity = data.maxQuantity;
    this.type = data.type;
    this.available = data.available;
    this.category = data.category;
  }

  // Behavior methods
/*  getFormattedPrice(): string {
    return `$${this.price.toFixed(2)}`;
  }

  isInStock(): boolean {
    return this.available;
  }

  hasSize(size: string): boolean {
    return this.sizes?.includes(size) ?? false;
  }*/
}
