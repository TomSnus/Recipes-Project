import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
@Output() selectedTarget = new EventEmitter<string>();

  onSelect(target: string){
    this.selectedTarget.emit(target);
  }
}
