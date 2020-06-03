import { AIRLINE, T_TYPE } from "./utils";

export class UserLoginDto {
    constructor(){
        this.UserId = 0;
        this.Username = "";
        this.Email = "";
        this.Password = "";
    }

  }

export class AirportDto {
    constructor() {
        this.AirportId = 0;
        this.AirportName = "";
        this.fuelCapacity = 0;
        this.fuelAvailable = 0;
    }
}

export class AirportDDL {
    constructor() {
        this.AirportId = 0;
        this.AirportName = "";
    }
}

export class AircraftDto {
    constructor() {
        this.AircraftId = 0;
        this.AircraftNumber = "";
        this.Airline = AIRLINE.default;
    }
}

export class AircraftDDL {
    constructor() {
        this.AircraftId = 0;
        this.AircraftNumber = "";
    }
}

export class TransactionDto {
    constructor() {
        this.TransactionId = 0;
        this.TransactionDateTime = '';
        this.TransactionType = T_TYPE.default;
        this.AirportId = 0;
        this.AircraftId = 0;
        this.Quantity = 0;
        this.TransactionIdParent = 0;
    }
}

