export interface AgendaItem {
  startTime: string;
  endTime: string;
  description: string;
}


export class AgendaItemModel implements AgendaItem {
  constructor(
    public startTime: string = '',
    public endTime: string = '',
    public description: string = ''
  ) {}
}
