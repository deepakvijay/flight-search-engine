import { Component, OnInit, Input, HostListener, ElementRef, forwardRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { City } from '../../model/search-result';


@Component({
  selector: 'app-city-auto-complete',
  templateUrl: './city-auto-complete.component.html',
  styleUrls: ['./city-auto-complete.component.scss']
})
export class CityAutoCompleteComponent implements OnInit {

  @Input()
  autocompleteGroup: FormGroup;

  searchField: FormControl;
  searches: City[] = [];
  cityList = [];

  @Input()
  searchPlaceholder = 'enter value';

  @Input()
  disabled = false;

  // Check if user click outside auto complete box so close the box.
  @HostListener('document:click', ['$event'])
  onclick(event: any) {
    let clickedTarget = event.target;
    let inComponent = false;
    do {
      if (clickedTarget === this.elementRef.nativeElement) {
        inComponent = true;
      }
      clickedTarget = clickedTarget.parentNode;
    }
    while (clickedTarget);
    if (!inComponent) {
      this.searches = [];
    }
  }

  constructor(private searchService: SearchService, private elementRef: ElementRef) {

  }

  ngOnInit() {
    this.getCities();
    this.searchField = <FormControl>this.autocompleteGroup.controls['searchField'];
    this.searchField.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(400)
      )
      .subscribe(search => {
        this.searches = [];
        if (search) {
          this.cityList.filter(function (city) {
            if (city.name && city.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
              this.searches.push(city);
            }
          }, this);
        }
      });
  }

  getCities() {
    this.searchService.getCities().subscribe((res) => {
      this.cityList = res.cities;
    });
  }

  onCitySelection(city) {
    this.searchField.setValue(city.name);
    this.searches = [];
  }
}
