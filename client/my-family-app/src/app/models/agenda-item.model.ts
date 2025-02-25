/**
 * @file agenda-item.model.ts
 * @description This file contains the AgendaItemModel class which implements the AgendaItem interface and represents an agenda item with its details.
 * @version 1.0.0
 * @author Danny Amezquita
 */

import { AgendaItem } from './agenda-item';

/**
 * Class representing an agenda item.
 */
export class AgendaItemModel implements AgendaItem {
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;

  /**
   * Constructor to initialize the fields.
   * @param {AgendaItem} data - Data to initialize the agenda item.
   */
  constructor(data: AgendaItem) {
    this.timeStart = data.timeStart;
    this.timeEnd = data.timeEnd;
    this.title = data.title;
    this.description = data.description;
  }

  // Behavior methods

  /**
   * Get the time range of the agenda item.
   * @returns {string} Time range in the format "start - end".
   */
  /* getTimeRange(): string {
    return `${this.timeStart} - ${this.timeEnd}`;
  }

  /**
   * Get the duration of the agenda item in minutes.
   * @returns {number} Duration in minutes.
   */
  /* getDuration(): number {
    const start = new Date(`1970/01/01 ${this.timeStart}`);
    const end = new Date(`1970/01/01 ${this.timeEnd}`);
    return (end.getTime() - start.getTime()) / (1000 * 60); // Returns minutes
  } */
}
