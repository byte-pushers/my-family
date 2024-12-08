import { AgendaItem } from './agenda-item';

export class AgendaItemModel implements AgendaItem {
  startTime: Date;
  endTime: Date;
  title: string;
  description: string;

  constructor(data: AgendaItem) {
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.title = data.title;
    this.description = data.description;
  }

  // Behavior methods
  /*getTimeRange(): string {
    return `${this.startTime} - ${this.endTime}`;
  }

  getDuration(): number {
    const start = new Date(`1970/01/01 ${this.startTime}`);
    const end = new Date(`1970/01/01 ${this.endTime}`);
    return (end.getTime() - start.getTime()) / (1000 * 60); // Returns minutes
  }*/

  public toString(): string {
    return `{
      "title": "${this.title}",
      "startTime": "${this.startTime.toISOString()}",
      "endDate": "${this.endTime.toISOString()}",
      "description": "${this.description}"
   }`;
  }
}
