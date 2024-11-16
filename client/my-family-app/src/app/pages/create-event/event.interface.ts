import { AgendaItem } from './agenda-item.interface';


export interface Event {
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  agendas: AgendaItem[];
}
