import React, { Component } from 'react'

export class fuelConsumption extends Component {
    constructor() {
        super()
        this.state = {
            groupbyAirport: {}
        }
    }

    groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            return result;
        }, {});
    };

    componentDidMount() {
        const { transactionList } = this.props.lists

        let groupBy = this.groupBy(transactionList, 'AirportId')
        // console.log(groupBy)
        // Object.keys(groupBy).map(airport => {
        //     groupBy[airport].map((transaction) => {
        //         console.log(transaction.TransactionId)
        //     })
        // })

        this.setState({ groupByAirport: groupBy })

    }

    render() {

        const { airportList, aircraftList, transactionList } = this.props.lists
        const { groupbyAirport } = this.state

        let groupBy = this.groupBy(transactionList, 'AirportId')
        //console.log(groupBy)


        return (
            <div>
                {
                    Object.keys(groupBy).map(airport => {
                        let a = airportList.find(x => x.AirportId == airport);
                        return (<div>
                            <h5 style={{'textAlign': 'left !important'}}>Airport: {a.AirportName}</h5>
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Transaction Date</th>
                                            <th>Transaction Type</th>
                                            <th>Aircraft</th>
                                            <th>Fuel</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { 
                                            groupBy[airport].map((transaction) =>
                                            <tr key={transaction.TransactionId}>
                                                <td>{transaction.TransactionDateTime}</td>
                                                <td>{transaction.TransactionType}</td>
                                                <td>{transaction.AircraftId > 0 ? transaction.AircraftId : '--'}</td>
                                                <td>{transaction.Quantity}</td>
                                            </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <h5 style={{'textAlign': 'left !important'}}>Fuel Available: {a.fuelAvailable}</h5>
                            <hr/>
                            <br/><br/>
                        </div>)
                        }
                    )
                }
            </div>
        )
    }
}

export default fuelConsumption
