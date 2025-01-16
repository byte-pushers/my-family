import { Address } from './address';
import { MerchandiseItem } from './merchandise-item';
import { AgendaItem } from './agenda-item';
import { BaseDomain } from './base-domain';


export interface Event extends BaseDomain {
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
