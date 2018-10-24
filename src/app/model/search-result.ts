export interface FlightRequestDetail {
    fare?: number;
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    passengers: number;
    isOneWay: boolean;
}

export interface Flight {
    fare: string;
    origin: string;
    destination: string;
    departTime: string;
    arriveTime: String;
    flightNumber: string;
}

export interface BookingDetail {
    oneWayFlightDetails: Flight[];
    returnFlightDetails?: Flight[];
    isOneWay: boolean;
}


export interface City {
    id: number;
    name: string;
}
