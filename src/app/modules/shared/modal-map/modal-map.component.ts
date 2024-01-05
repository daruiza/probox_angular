import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-modal-map',
  templateUrl: './modal-map.component.html',
  styleUrls: ['./modal-map.component.scss']
})
export class ModalMapComponent implements OnInit {


  @Input() addMarkerOnClick: boolean = false;
  @Input() location!: google.maps.LatLngLiteral;
  @Input() marker_options!: google.maps.MarkerOptions;

  @Input() limitMarkers: number = 1;

  @Output() addressMarkerOnChange = new EventEmitter<any>();

  public geoCoder;
  public zoom = signal<number>(12);
  public center!: google.maps.LatLngLiteral;
  // public center = signal<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
  public options = signal<google.maps.MapOptions>({
    // mapTypeId: 'hybrid',
    // zoomControl: false,
    // scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  });

  public addressMarker!: google.maps.LatLngLiteral | google.maps.LatLng;
  // public addressMarker = signal<google.maps.LatLngLiteral | google.maps.LatLng>;
  public optionMarker = { draggable: true, animation: google.maps.Animation.DROP }

  constructor(
    public readonly translate: TranslateService,
    public readonly appService: AppService,
    public readonly activeModal: NgbActiveModal,
  ) {
    this.geoCoder = new google.maps.Geocoder;
  }

  ngOnInit(): void {
    this.mapCenter();
  }

  mapCenter() {
    if (this.location && 'lat' in this.location && 'lng' in this.location) {
      this.center = { ...this.location };
      this.addressMarker = { ...this.location }
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      // this.center.set({
      //   lat: position.coords.latitude,
      //   lng: position.coords.longitude,
      // });
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  mapClick(event: any) {
    if (this.addMarkerOnClick) {
      this.location = this.addressMarker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      }
      this.geoCoder.geocode({ 'location': { lat: event.latLng.lat(), lng: event.latLng.lng() } }, (results, status) => {
        if (status === 'OK') {
          if (results && results[0]) {
            this.addressMarkerOnChange.emit({
              address: results[0].formatted_address,
              location: { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() },
            });
          }
        }
      });
    }
  }

  mapDblclick(event: any) {
    // event.preventDefault();    
    console.log('mapDblclick', event);

  }

  // Marker
  dragableChanged(event: any) {
    this.geoCoder.geocode({ 'location': { lat: event.latLng.lat(), lng: event.latLng.lng() } }, (results, status) => {
      if (status === 'OK') {
        if (results && results[0]) {
          this.addressMarkerOnChange.emit({
            address: results[0].formatted_address,
            location: { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() },
          });
        }
      }
    });
  }

  markerClick(event: any) {
    this.location = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    console.log('markerClick', event.latLng.lat());
    console.log('markerClick', event.latLng.lng());
  }

  goToMaps() {
    window.open(`https://maps.google.com/?q=${this.location.lat},${this.location.lng}`, '_blank');
  }

}
