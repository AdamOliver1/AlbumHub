import { ApplicationRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationCoords } from 'src/app/models/locationCoords';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})

export class GoogleMapsComponent implements OnInit {
  lat: number;
  lng: number;

  constructor(
    private appRef: ApplicationRef,
    private dialogRef: MatDialogRef<GoogleMapsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) this.placeMarkerAndPanToFromInjection(this.data);      
    else {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
      })
    }
  }

  ngOnInit(): void { }

  onAddLocation() {
    let location = new LocationCoords();
    location.lat = this.lat;
    location.lng = this.lng;
    this.dialogRef.close(location);
  }

  placeMarkerAndPanTo(latLng: any) {
    this.lat = latLng.lat();
    this.lng = latLng.lng();
    this.appRef.tick();
  }


  placeMarkerAndPanToFromInjection(location: any) {
    this.lat = location.lat;
    this.lng = location.lng;
    this.appRef.tick();
  }

  mapReady(map: any) {
    map.addListener('click', ((e: any) => {
      this.placeMarkerAndPanTo(e?.latLng);
    }));
  }
}
