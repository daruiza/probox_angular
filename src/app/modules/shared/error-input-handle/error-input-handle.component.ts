import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-input-handle',
  templateUrl: './error-input-handle.component.html',
  styleUrls: ['./error-input-handle.component.scss']
})
export class ErrorInputHandleComponent {

  @Input() errors: any[] = [];

}
