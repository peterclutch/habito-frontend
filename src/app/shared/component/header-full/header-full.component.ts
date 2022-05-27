import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ha-header-full',
  templateUrl: './header-full.component.html',
  styleUrls: ['./header-full.component.scss']
})
export class HeaderFullComponent {

  @Input() title: string = '';
  @Input() backButton = true;

  @Output() backEvent = new EventEmitter();

  back() {
    this.backEvent.emit();
  }

}
