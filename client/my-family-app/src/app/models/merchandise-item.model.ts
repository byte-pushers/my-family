/**
 * @file merchandise-item.model.ts
 * @description This file contains the MerchandiseItemModel class which implements the MerchandiseItem interface and represents a merchandise item with its details.
 * @version 1.0.0
 */

import { MerchandiseItem } from './merchandise-item';

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
  SKU?: string;
  color?: string;
  author?: string;
  ISBN?: string;
  wearableType?: string;

  /**
   * Constructor to initialize a merchandise item.
   *
   * @param {string} id - The unique identifier of the merchandise item.
   * @param {string} name - The name of the merchandise item.
   * @param {string} [description] - The description of the merchandise item.
   * @param {number} price - The price of the merchandise item.
   * @param {string} image - The image URL of the merchandise item.
   * @param {string[]} [sizes] - The available sizes of the merchandise item.
   * @param {number} maxQuantity - The maximum quantity allowed.
   * @param {'clothing' | 'ticket' | 'other'} type - The type of the merchandise item.
   * @param {boolean} available - Availability of the merchandise item.
   * @param {string} [category] - The category of the merchandise item.
   * @param {string} [SKU] - The SKU of the merchandise item.
   * @param {string} [color] - The color of the merchandise item.
   * @param {string} [author] - The author associated with the merchandise item (if applicable).
   * @param {string} [ISBN] - The ISBN of the merchandise item (if applicable).
   * @param {string} [wearableType] - The wearable type of the merchandise item (if applicable).
   */
  constructor(...args: any[])
  constructor(props: MerchandiseItem)
  constructor(
    id: string,
    name: string,
    description: string | undefined,
    price: number,
    image: string,
    sizes: string[] | undefined,
    maxQuantity: number,
    type: 'clothing' | 'ticket' | 'other',
    available: boolean,
    category: string | undefined,
    SKU: string | undefined,
    color: string | undefined,
    author: string | undefined,
    ISBN: string | undefined,
    wearableType: string | undefined
  )
  constructor() {
    const props: any = {};

    function getSuperParameters(args: IArguments, props: any): any {
      if (args.length === 1) {
        props.id = args[0]?.id;
        props.name = args[0]?.name;
        props.description = args[0]?.description;
        props.price = args[0]?.price;
        props.image = args[0]?.image;
        props.sizes = args[0]?.sizes;
        props.maxQuantity = args[0]?.maxQuantity;
        props.type = args[0]?.type;
        props.available = args[0]?.available;
        props.category = args[0]?.category;
        props.SKU = args[0]?.SKU;
        props.color = args[0]?.color;
        props.author = args[0]?.author;
        props.ISBN = args[0]?.ISBN;
        props.wearableType = args[0]?.wearableType;
      } else {
        props.id = args[0];
        props.name = args[1];
        props.description = args[2];
        props.price = args[3];
        props.image = args[4];
        props.sizes = args[5];
        props.maxQuantity = args[6];
        props.type = args[7];
        props.available = args[8];
        props.category = args[9];
        props.SKU = args[10];
        props.color = args[11];
        props.author = args[12];
        props.ISBN = args[13];
        props.wearableType = args[14];
      }
      return props;
    }

    const propsFromArgs = getSuperParameters(arguments, props);
    this.id = propsFromArgs.id;
    this.name = propsFromArgs.name;
    this.description = propsFromArgs.description;
    this.price = propsFromArgs.price;
    this.image = propsFromArgs.image;
    this.sizes = propsFromArgs.sizes;
    this.maxQuantity = propsFromArgs.maxQuantity;
    this.type = propsFromArgs.type;
    this.available = propsFromArgs.available;
    this.category = propsFromArgs.category;
    this.SKU = propsFromArgs.SKU;
    this.color = propsFromArgs.color;
    this.author = propsFromArgs.author;
    this.ISBN = propsFromArgs.ISBN;
    this.wearableType = propsFromArgs.wearableType;
  }

  // Behavior methods
  /*getFormattedPrice(): string {
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
