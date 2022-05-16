import { Component, Input } from '@angular/core';

export enum CardSize {
  DEFAULT = '950',
  FORM = '800'
}

@Component({
  selector: 'ha-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() size = CardSize.DEFAULT

}
