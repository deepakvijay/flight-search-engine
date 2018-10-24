import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { ApiEndPoints } from '../constants/api-end-points';
import { Observable, BehaviorSubject } from 'rxjs';
import { FlightRequestDetail, Flight, BookingDetail } from '../model/search-result';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  private flightSearchResultSubject = new BehaviorSubject(null);
  private flightSearchRequest = new BehaviorSubject(null);

  getCities(): Observable<any> {
    const url = ApiEndPoints.SearchEndPoints.getCities;
    return this.http.get(url);
  }

  searchFlights(searchRequest: FlightRequestDetail) {
    const url = ApiEndPoints.SearchEndPoints.getFlights;

    this.flightSearchRequest.next(searchRequest);

    this.http.get(url).subscribe((res) => {
      const oneWayFlightResult = this.oneWayFliterResult(searchRequest, res);
      const returnFlightResult = this.returnTripFliterdResult(searchRequest, res);

      const bookingDetails: BookingDetail = {
        isOneWay: searchRequest.isOneWay,
        oneWayFlightDetails: oneWayFlightResult,
        returnFlightDetails: returnFlightResult
      };

      this.flightSearchResultSubject.next(bookingDetails);
    });
  }

  oneWayFliterResult(searchParam: FlightRequestDetail, flightsData: any) {
    const oneWayfilterdResult: Flight[] = [];

    const flightsByRange = [];

    flightsData.flights.map((x) => {
      // tslint:disable-next-line:radix
      parseInt(x.fare) <= searchParam.fare ? flightsByRange.push(x) : console.log('Out of range');
    });

    flightsByRange.filter(function (x) {
      if (Date.parse(x.date.split(' ')[0]) === Date.parse(searchParam.departureDate)
        && x.origin.toLowerCase() === searchParam.origin.toLowerCase()
        && x.destination.toLowerCase() === searchParam.destination.toLowerCase()) {
        const flight: Flight = {
          origin: x.origin,
          destination: x.destination,
          arriveTime: x.time.arrive.split(' ')[1],
          departTime: x.time.depart.split(' ')[1],
          fare: x.fare,
          flightNumber: x.flightNumber
        };

        oneWayfilterdResult.push(flight);
      }
    });


    return oneWayfilterdResult;
  }

  returnTripFliterdResult(searchParam: FlightRequestDetail, flightsData: any) {
    const returnFilterdResult: Flight[] = [];

    const flightsByRange = [];

    flightsData.flights.map((x) => {
      // tslint:disable-next-line:radix
      parseInt(x.fare) <= searchParam.fare ? flightsByRange.push(x) : console.log('Out of range');
    });

    // Destination and origin will reverse in this case.
    if (!searchParam.isOneWay) {
      flightsByRange.filter(function (x) {
        if (Date.parse(x.date.split(' ')[0]) === Date.parse(searchParam.returnDate)
          && x.origin.toLowerCase() === searchParam.destination.toLowerCase()
          && x.destination.toLowerCase() === searchParam.origin.toLowerCase()) {
          const flight: Flight = {
            origin: x.origin,
            destination: x.destination,
            arriveTime: x.time.arrive.split(' ')[1],
            departTime: x.time.depart.split(' ')[1],
            fare: x.fare,
            flightNumber: x.flightNumber
          };
          returnFilterdResult.push(flight);
        }
      });
    }

    return returnFilterdResult;
  }

  showFlightResult() {
    return this.flightSearchResultSubject.asObservable();
  }

  showFlightBreadCrumb() {
    return this.flightSearchRequest.asObservable();
  }
}
