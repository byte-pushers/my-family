/**
 * @file agenda-item.ts
 * @description This file contains the AgendaItem interface which represents an agenda item with its details.
 * @version 1.0.0
 */

/**
 * Interface representing an agenda item.
 */
export interface AgendaItem {
  startTime: Date;
  endTime: Date;
  title: string;
  description: string;
}
