import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.scss']
})
export class ModalMapComponent implements OnInit {

  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    // mapTypeId: 'hybrid',
    // zoomControl: false,
    // scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  constructor(
    public readonly translate: TranslateService,
    public readonly appService: AppService,
    public readonly activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('position', position);
      
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  mapClick(event: any) {
    console.log('mapClick', event);

  }

  mapDblclick(event: any) {
    // event.preventDefault();    
    console.log('mapDblclick', event);

  }

}
