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

  // Public getter methods and two-way binding compatibility
  public get name(): string { return this.#name; }
  public set name(value: string) { this.#name = value; }
  public getName(): string { return this.#name; }

  public get type(): string { return this.#type; }
  public set type(value: string) { this.#type = value; }
  public getType(): string { return this.#type; }

  public get startDate(): string { return this.#startDate; }
  public set startDate(value: string) { this.#startDate = value; }
  public getStartDate(): string { return this.#startDate; }

  public get endDate(): string { return this.#endDate; }
  public set endDate(value: string) { this.#endDate = value; }
  public getEndDate(): string { return this.#endDate; }

  public get startTime(): string { return this.#startTime; }
  public set startTime(value: string) { this.#startTime = value; }
  public getStartTime(): string { return this.#startTime; }

  public get endTime(): string { return this.#endTime; }
  public set endTime(value: string) { this.#endTime = value; }
  public getEndTime(): string { return this.#endTime; }

  public get location(): string { return this.#location; }
  public set location(value: string) { this.#location = value; }
  public getLocation(): string { return this.#location; }

  public get agendas(): AgendaItem[] { return this.#agendas; }
  public set agendas(value: AgendaItem[]) { this.#agendas = value; }
  public getAgendas(): AgendaItem[] { return this.#agendas; }

  public get merchandiseList(): MerchandiseItem[] { return this.#merchandiseList; }
  public set merchandiseList(value: MerchandiseItem[]) { this.#merchandiseList = value; }
  public getMerchandiseList(): MerchandiseItem[] { return this.#merchandiseList; }


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
