import React, { Component } from 'react'

export class airportTable extends Component {
    handleEdit = (event) => {
        console.log("airport:")
        console.log(event.currentTarget.value)
        this.props.data.getAirportId(event.currentTarget.value)
    }
    
    render() {
    
        const { airportList } = this.props.data.listOfAirports;
        
        return (
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Airport Name</th>
                            <th>Fuel Capacity</th>
                            <th>Fuel Available</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            airportList.map((airport) =>
                                <tr key={airport.AirportId}>
                                    <td>{airport.AirportName}</td>
                                    <td>{airport.fuelCapacity}</td>
                                    <td>{airport.fuelAvailable}</td>
                                    <td style={{ cursor: 'pointer' }}>
                                        <button className="btn btn-sm btn-secondary" value={airport.AirportId} onClick={this.handleEdit}>Edit</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default airportTable
