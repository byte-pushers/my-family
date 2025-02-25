import { AgendaItem } from './agenda-item.interface';


export interface Event {
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  agendas: AgendaItem[];
}
