import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { BookingDetail, Flight } from '../../model/search-result';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  constructor(private searchService: SearchService) { }
  flightDetails: BookingDetail;

  ngOnInit() {
    this.searchService.showFlightResult().subscribe((res: BookingDetail) => {
      this.flightDetails = res;
      if (this.flightDetails) {
        console.log(this.flightDetails.returnFlightDetails[0]);
      }
    });
  }
}
