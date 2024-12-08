/*export interface AgendaItem {
  startTime: string;
  endTime: string;
  description: string;
}*/


import { AgendaItem } from '../../models/agenda-item';

export class AgendaItemModel implements AgendaItem {
  constructor(
    public title: string = '',
    public startTime: Date = new Date(),
    public endTime: Date = new Date(),
    public description: string = ''
  ) {}
}
