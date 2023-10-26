import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.scss']
})
export class ModalMapComponent {

  constructor(
    public readonly translate: TranslateService,
    public readonly appService: AppService,
    public readonly activeModal: NgbActiveModal,
  ) { }

  mapClick(event: any) {
    
  }

  mapDblclick(event: any) {
    event.preventDefault();
    
    console.log('mapDblclick', event);
    
  }

}
