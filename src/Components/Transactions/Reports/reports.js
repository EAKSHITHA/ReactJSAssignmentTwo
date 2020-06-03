import React, { Component } from 'react'
import AirportSummaryReport from './airportSummary'
import FuelComsumptionReport from './fuelConsumption'

export class reports extends Component {
    render() {
        return (
            <div style={{'width': '800px', 'marginLeft': '20%'}}>
                <h4 style={{'paddingTop': '30px', 'fontWeight': 'bold'}}>AIRPORT SUMMARY REPORT</h4>
                <hr/>
                <br/><br/>
                <AirportSummaryReport airportList = {this.props.data.airportList}/>
                <br></br>
                <hr/>
                <h4 style={{'fontWeight': 'bold'}}>FUEL CONSUMPTION REPORT</h4>
                <hr/>
                <br></br>
                <FuelComsumptionReport lists = {{ airportList: this.props.data.airportList, 
                aircraftList: this.props.data.aircraftList, transactionList: this.props.data.transactionList }}/>
            </div>
        )
    }
}

export default reports
