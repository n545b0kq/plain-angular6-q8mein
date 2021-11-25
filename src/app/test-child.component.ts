import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'test-child',
  templateUrl: 'test-child.component.html',
})
export class TestChildComponent {
  @Input() data = [];
  @Output() exitData = new EventEmitter();

  finish() {
    let val: number = Math.floor(Math.random() * 10);
    this.exitData.emit(this.data[val]);
  }
}
