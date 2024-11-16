import { AgendaItem } from './agenda-item.model';


export class EventModel {
  name: string = '';
  type: string = '';
  startDate: string = '';
  endDate: string = '';
  startTime: string = '';
  endTime: string = '';
  location: string = '';
  agendas: AgendaItem[] = [];
}
