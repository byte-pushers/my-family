/**
 * @file merchandise-item.model.ts
 * @description This file contains the MerchandiseItemModel class which implements the MerchandiseItem interface and represents a merchandise item with its details.
 * @version 1.0.0
 */

import { MerchandiseItem } from './merchandise-item';

/**
 * Class representing a merchandise item.
 */
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
  SKU?: string;
  color?: string;
  author?: string;
  ISBN?: string;
  wearableType?: string;

  /**
   * Constructor to initialize the fields.
   * @param {MerchandiseItem} data - Data to initialize the merchandise item.
   */
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

  /**
   * Get the formatted price.
   * @returns {string} Formatted price.
   */
  public getFormattedPrice(): string {
    return `$${this.price.toFixed(2)}`;
  }

  /**
   * Check if the item is in stock.
   * @returns {boolean} True if the item is available, false otherwise.
   */
  public isInStock(): boolean {
    return this.available;
  }

  /**
   * Check if the item has a specific size.
   * @param {string} size - The size to check.
   * @returns {boolean} True if the size is available, false otherwise.
   */
  public hasSize(size: string): boolean {
    return this.sizes?.includes(size) ?? false;
  }
}
