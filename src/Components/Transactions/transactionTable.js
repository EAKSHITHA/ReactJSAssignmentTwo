import React, { Component } from 'react'

export default class transactionTable extends Component {
    handleReverse = (event) => {
        console.log("Transaction:")
        console.log(event.currentTarget.value)
        this.props.data.reverseTransactionId(event.currentTarget.value)
    }
    
    render() {
    
        const { transactionList } = this.props.data.listOfTransactions;
        
        return (
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Transaction No</th>
                            <th>Transaction Type</th>
                            <th>Airport</th>
                            <th>Aircraft</th>
                            <th>Quantity</th>
                            <th>Reverse Transaction</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactionList.map((transaction) =>
                                <tr key={transaction.TransactionId}>
                                    <td>{transaction.TransactionId}</td>
                                    <td>{transaction.TransactionType}</td>
                                    <td>{transaction.AirportId}</td>
                                    <td>{transaction.AircraftId > 0? transaction.AircraftId: '--'}</td>
                                    <td>{transaction.Quantity}</td>
                                    <td style={{ cursor: 'pointer' }}>
                                        {
                                            transaction.TransactionIdParent > 0 ? (<span>#TID {transaction.TransactionIdParent } reversed</span>) : 
                                            (
                                                <button className="btn btn-sm btn-secondary" value={transaction.TransactionId} onClick={this.handleReverse}>Reverse</button>
                                            )
                                        }
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
