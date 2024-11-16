import { Component, Input } from '@angular/core';
import { AgendaItem } from './agenda-item.model';


@Component({
  selector: 'app-agenda-item',
  template: `
    <div class="agenda-item">
      <span>{{ agenda.startTime }} - {{ agenda.endTime }}</span>
      <p>{{ agenda.description }}</p>
    </div>
  `,
  standalone: true
})
export class AgendaItemComponent {
  @Input() agenda!: AgendaItem;
}
