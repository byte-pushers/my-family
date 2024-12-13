/**
 * @file agenda-item.ts
 * @description This file contains the AgendaItem interface which represents an agenda item with its details.
 * @version 1.0.0
 */

/**
 * Interface representing an agenda item.
 */
export interface AgendaItem {
  timeStart: string;
  timeEnd: string;
  title: string;
  description: string;
}
