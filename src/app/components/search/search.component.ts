import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { FlightRequestDetail } from '../../model/search-result';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  isOneWaySearch = false;
  refine = 1000;

  searchForm: FormGroup;
  originGroup: FormGroup;
  destinationGroup: FormGroup;

  origin: FormControl;
  destination: FormControl;
  departureDate: FormControl;
  returnDate: FormControl;
  passengers: FormControl;

  ngOnInit() {
    this.createSearchForm();
  }

  createSearchForm() {
    this.searchForm = new FormGroup({
      originGroup: this.originGroup = new FormGroup({
        searchField: this.origin = new FormControl('', Validators.required),
      }),
      destinationGroup: this.destinationGroup = new FormGroup({
        searchField: this.destination = new FormControl('', Validators.required),
      }),
      departureDate: this.departureDate = new FormControl('', Validators.required),
      returnDate: this.returnDate = new FormControl('', Validators.required),
      passengers: this.passengers = new FormControl('', Validators.required)
    });
  }

  onTripTypeTabChange(oneway: boolean): void {
    this.isOneWaySearch = oneway;
  }

  onSearchFlights() {
    const searchParam: FlightRequestDetail = {
      origin: this.origin.value,
      destination: this.destination.value,
      departureDate: this.departureDate.value,
      returnDate: this.returnDate.value,
      passengers: this.passengers.value,
      isOneWay: this.isOneWaySearch,
      fare: this.refine
    };

    this.searchFlights(searchParam);
  }

  searchFlights(searchParam: FlightRequestDetail) {
    this.searchService.searchFlights(searchParam);
  }

  onPriceRangeChange(e) {
    this.onSearchFlights();
  }

}
