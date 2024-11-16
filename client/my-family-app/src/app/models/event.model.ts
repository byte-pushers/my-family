import { AgendaItem } from '../interfaces/agenda-item.interface';
import { Event } from './event';

interface MerchandiseItem {
  merchandiseType: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  productImageUrl: string;
  SKU?: string;
  size?: string;
  color?: string;
  author?: string;
  ISBN?: string;
  wearableType?: string;
}

export class EventModel implements Event {
  #name: string;
  #type: string;
  #startDate: string;
  #endDate: string;
  #startTime: string;
  #endTime: string;
  #location: string;
  #agendas: AgendaItem[];
  #merchandiseList: MerchandiseItem[];

  constructor(
      name: string = '',
      type: string = '',
      startDate: string = '',
      endDate: string = '',
      startTime: string = '',
      endTime: string = '',
      location: string = '',
      agendas: AgendaItem[] = [],
      merchandiseList: MerchandiseItem[] = []
  ) {
    this.#name = name;
    this.#type = type;
    this.#startDate = startDate;
    this.#endDate = endDate;
    this.#startTime = startTime;
    this.#endTime = endTime;
    this.#location = location;
    this.#agendas = agendas;
    this.#merchandiseList = merchandiseList;
  }

  public getName(): string {
    return this.#name;
  }

  public get name(): string {
    return this.#name;
  }

  public getType(): string {
    return this.#type;
  }

  public get type(): string {
    return this.#type;
  }

  public getStartDate(): string {
    return this.#startDate;
  }

  public get startDate(): string {
    return this.#startDate;
  }

  public getEndDate(): string {
    return this.#endDate;
  }

  public get endDate(): string {
    return this.#endDate;
  }

  public getStartTime(): string {
    return this.#startTime;
  }

  public get startTime(): string {
    return this.#startTime;
  }

  public getEndTime(): string {
    return this.#endTime;
  }

  public get endTime(): string {
    return this.#endTime;
  }

  public getLocation(): string {
    return this.#location;
  }

  public get location(): string {
    return this.#location;
  }

  public getAgendas(): AgendaItem[] {
    return this.#agendas;
  }

  public get agendas(): AgendaItem[] {
    return this.#agendas;
  }

  public getMerchandiseList(): MerchandiseItem[] {
    return this.#merchandiseList;
  }

  public get merchandiseList(): MerchandiseItem[] {
    return this.#merchandiseList;
  }

  // toString method to represent the EventModel as a string
  public toString(): string {
    return `{
      name: ${this.#name},
      type: ${this.#type},
      startDate: ${this.#startDate},
      endDate: ${this.#endDate},
      startTime: ${this.#startTime},
      endTime: ${this.#endTime},
      location: ${this.#location},
      agendas: ${JSON.stringify(this.#agendas)},
      merchandiseList: ${JSON.stringify(this.#merchandiseList)}
    }`;
  }
}
