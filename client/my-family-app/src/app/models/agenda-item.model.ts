import { AgendaItem } from './agenda-item';

export class AgendaItemModel implements AgendaItem {
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;

  constructor(data: AgendaItem) {
    this.timeStart = data.timeStart;
    this.timeEnd = data.timeEnd;
    this.title = data.title;
    this.description = data.description;
  }

  // Behavior methods
/*  getTimeRange(): string {
    return `${this.timeStart} - ${this.timeEnd}`;
  }

  getDuration(): number {
    const start = new Date(`1970/01/01 ${this.timeStart}`);
    const end = new Date(`1970/01/01 ${this.timeEnd}`);
    return (end.getTime() - start.getTime()) / (1000 * 60); // Returns minutes
  }*/
}
