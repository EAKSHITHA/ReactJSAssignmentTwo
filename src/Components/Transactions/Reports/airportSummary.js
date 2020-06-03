import React, { Component } from 'react'

export class airportSummary extends Component {
    handleReverse = (event) => {
        console.log("Transaction:")
        console.log(event.currentTarget.value)
        this.props.data.reverseTransactionId(event.currentTarget.value)
    }
    
    render() {
    
        const { airportList } = this.props;
        
        return (
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Airport Name</th>
                            <th>Fuel Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            airportList.map((airport) =>
                                <tr key={airport.AirportId}>
                                    <td>{airport.AirportName}</td>
                                    <td>{airport.fuelAvailable}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default airportSummary
