import { Component, OnInit } from '@angular/core';

  declare var google;

  class Coords{
    plat : number;
    plng : number;
    dlat : number;
    flng: number;

  }
  
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  coords:Coords;
  c
  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  // FCFM
  origin = { lat: 25.725593, lng: -100.315152 };
  // Parque fundidora
  destination = { lat: 25.678837, lng: -100.284303 };
  
  constructor() {
    this.coords= new Coords();
  }

  ngOnInit(){
    this.loadMap();
  }
  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    const indicatorsEle: HTMLElement = document.getElementById('indicators');
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.origin,
      zoom: 12
    });

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(indicatorsEle);
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }

  private calculateRoute(){
    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }
 

}
