import { AgendaItem } from './agenda-item';
import { BaseModel } from "./base.model";
import { Address } from "./address";
import { MerchandiseItem } from "./merchandise-item";


export interface Event extends BaseModel {
  name: string;
  type: string;
  startDate: Date | null;
  endDate: Date | null;
  startTime: Date | null;
  endTime: Date | null;
  location: Address | null;
  agendas: AgendaItem[] | null;
  merchandiseList: MerchandiseItem[] | null;
}
