import { MerchandiseItem } from './merchandise-item';
import { BaseDomainModel } from './base-domain.model';

export class MerchandiseItemModel extends BaseDomainModel implements MerchandiseItem {
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
    super(data as { id?: number, createdBy?: string, createdDate?: Date, updatedBy?: string, updatedDate?: Date });
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
  /*getFormattedPrice(): string {
    return `$${this.price.toFixed(2)}`;
  }

  isInStock(): boolean {
    return this.available;
  }

  hasSize(size: string): boolean {
    return this.sizes?.includes(size) ?? false;
  }*/

  public override toString(): string {
    return `{
      "name": "${this.name}",
      "description": "${this.description}",
      "price": "${this.price}",
      "image": "${this.image}",
      "sizes": "${this.sizes}",
      "maxQuantity": "${this.maxQuantity}",
      "type": "${this.type}",
      "available": "${this.available}",
      "category": "${this.category}"
   }`;
  }
}
