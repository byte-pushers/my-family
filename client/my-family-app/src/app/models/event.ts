import { AgendaItem } from './agenda-item.interface';


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
