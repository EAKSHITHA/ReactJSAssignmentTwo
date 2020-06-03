import React, { Component } from 'react'

export class aircraftTable extends Component {
    handleEdit = (event) => {
        console.log("aircraft:")
        console.log(event.currentTarget.value)
        this.props.data.getAircraftId(event.currentTarget.value)
    }
    
    render() {
    
        const { aircraftList } = this.props.data.listOfAircrafts;
        
        return (
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Aircraft Number</th>
                            <th>Airline</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            aircraftList.map((aircraft) =>
                                <tr key={aircraft.AircraftId}>
                                    <td>{aircraft.AircraftNumber}</td>
                                    <td>{aircraft.Airline}</td>
                                    <td style={{ cursor: 'pointer' }}>
                                        <button className="btn btn-sm btn-secondary" value={aircraft.AircraftId} onClick={this.handleEdit}>Edit</button>
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

export default aircraftTable
