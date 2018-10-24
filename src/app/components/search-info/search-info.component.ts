import { Component, OnInit, Input } from '@angular/core';
import { FlightRequestDetail } from '../../model/search-result';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-info',
  templateUrl: './search-info.component.html',
  styleUrls: ['./search-info.component.scss']
})
export class SearchInfoComponent implements OnInit {

  data: FlightRequestDetail;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.showFlightBreadCrumb().subscribe((res) => {
      this.data = res;
    });
  }

}
