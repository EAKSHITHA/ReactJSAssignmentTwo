import React, { Component } from 'react'
import { AirportDDL } from '../../_services/_utils/models';
import { AircraftDDL } from '../../_services/_utils/models';
import { T_TYPE } from '../../_services/_utils/utils'
import TransactionTable from '../Transactions/transactionTable';

export class transactions extends Component {
    constructor(props) {
        super();
        this.state = {

            TransactionId: 0,
            TransactionDateTime: '',
            TransactionType: T_TYPE.default,
            AirportId: 0,
            AircraftId: 0,
            Quantity: 0,
            TransactionIdParent: 0,

            reverseTransactionId: 0,

            ttRequired: false,
            apRequired: false,
            acRequired: false,
            qRequired: false,
            qWrong: false,

            transactionList: [],

            airportIdNameList: [],
            aircraftIdNumberList: []
        }

    }

    componentDidMount() {
        //console.log("transactionlist:")
        //console.log(this.state.transactionList)
        this.setState({transactionList: this.props.data.transactionList}, () => {
            let airportList = []
            this.props.data.airportList.map((airport) => {
                let airportObj = new AirportDDL();
                airportObj.AirportId = airport.AirportId;
                airportObj.AirportName = airport.AirportName;
                airportList.push(airportObj)
            });
            this.setState({ airportIdNameList: airportList }, () => { console.log(this.state.airportIdNameList) })
    
            let aircraftList = []
            this.props.data.aircraftList.map((aircraft) => {
                let aircraftObj = new AircraftDDL();
                aircraftObj.AircraftId = aircraft.AircraftId;
                aircraftObj.AircraftNumber = aircraft.AircraftNumber;
                aircraftList.push(aircraftObj)
            });
            this.setState({ aircraftIdNumberList: aircraftList }, () => { console.log(this.state.aircraftIdNumberList) })
        })
    }

    handleChange = (event, fieldName, requiredField) => {
        console.log(this.props.airportList)
        console.log(fieldName)
        console.log(event.target.value)
        this.setState({ [fieldName]: event.target.value, [requiredField]: false})
    }

    validateForm() {
        let canSubmit = true;
        console.log(this.state.AircraftId)
        console.log(this.state.AirportId)

        if (this.state.AirportId == "none" || (this.state.airportIdNameList.findIndex(x => x.AirportId == parseInt(this.state.AirportId)) == -1)) {
            this.setState({ apRequired: true })
            canSubmit = false;
        }
        if (this.state.AircraftId == "none" || (this.state.aircraftIdNumberList.includes(x => x.AircraftId == parseInt(this.state.AircraftId)) == -1)) {
            this.setState({ acRequired: true })
            canSubmit = false;
        }
        if (this.state.TransactionType !== T_TYPE.inout && this.state.TransactionType !== T_TYPE.outin) {
            this.setState({ ttRequired: true })
            canSubmit = false;
        }
        let list = this.props.data.airportList.find(x => x.AirportId == this.state.AirportId);
        if (this.state.Quantity > list.fuelCapacity || this.state.Quantity > list.fuelAvailable) {
            this.setState({ qWrong: true })
            canSubmit = false;
        }
        if(this.state.Quantity == '' || this.state.Quantity == 0) {
            this.setState({qRequired: true})
            canSubmit = false;
        }
        return canSubmit;
    }

    clearForm() {
        this.setState({
            TransactionId: 0,
            TransactionDateTime: '',
            TransactionType: T_TYPE.default,
            AirportId: 0,
            AircraftId: 0,
            Quantity: 0,
            TransactionIdParent: 0,

            reverseTransactionId: 0,

            ttRequired: false,
            apRequired: false,
            acRequired: false,
            qRequired: false
        })
    }

    updateFuelAvailable() {
        let data = this.props.data.airportList.find(x => x.AirportId == this.state.AirportId);
        console.log(data)
        console.log(this.state.AirportId)
        console.log(this.props.data.airportList)
        if(this.state.TransactionType == T_TYPE.inout) {
            data.fuelAvailable = data.fuelAvailable - this.state.Quantity
        }
        else {
            data.fuelAvailable = data.fuelAvailable + this.state.Quantity
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (this.validateForm()) {
            this.updateFuelAvailable();
            let tList = this.state.transactionList;
            let len = tList.length;
            tList.push({
                'TransactionId': len + 1,
                'TransactionDateTime': this.getFormattedDate(),
                'TransactionType': this.state.TransactionType,
                'AirportId': parseInt(this.state.AirportId),
                'AircraftId': parseInt(this.state.AircraftId),
                'Quantity': parseFloat(this.state.Quantity),
                'TransactionIdParent': 0
            })
            this.setState({
                transactionList: tList
            },(tlist) => {console.log(tlist)})
            alert("Transaction Added");
            this.clearForm()
        }
    }

    getFormattedDate() {
        var todayTime = new Date();
        var month = (todayTime.getMonth() + 1);
        var day = (todayTime.getDate());
        var year = (todayTime.getFullYear());
        return day + "/" + month + "/" + year;
    }

    addReverseTransaction(id) {
        this.setState({ reverseTransactionId: id })
        console.log(id)
        let transaction = this.state.transactionList.find(x => x.TransactionId == id)
        console.log(transaction)

        let airport = this.props.data.airportList.find(x => x.AirportId == transaction.AirportId)
        if(transaction.TransactionType == T_TYPE.inout) {
            airport.fuelAvailable = airport.fuelAvailable + transaction.Quantity
        }
        else {
            airport.fuelAvailable = airport.fuelAvailable - transaction.Quantity
        }

        let tList = this.state.transactionList;
        let len = tList.length;
        tList.push({
            'TransactionId': len + 1,
            'TransactionDateTime': this.getFormattedDate(),
            'TransactionType': transaction.TransactionType == T_TYPE.inout ? T_TYPE.outin : T_TYPE.inout,
            'AirportId': parseInt(transaction.AirportId),
            'AircraftId': parseInt(transaction.AircraftId),
            'Quantity': parseFloat(transaction.Quantity),
            'TransactionIdParent': id
        })
        this.setState({
            transactionList: tList
        }, (tlist) => {console.log(tlist)})
        alert("Transaction Reversed");
    }

    render() {

        const { TransactionType, Quantity, AirportId, AircraftId, ttRequired, apRequired, acRequired, qRequired, qWrong, airportIdNameList, aircraftIdNumberList } = this.state;

        const alignLeft = {
            textAlign: 'left'
        }
        const formBox = {
            boxShadow: '2px 2px 10px grey',
            borderRadius: '2px',
            padding: '20px',
            margin: '20px'
        }
        const table = {
            width: '100%',
            padding: '20px',
            boxShadow: '2px 2px 10px grey',
            borderRadius: '2px',
            marginTop: '20px'
        }
        const errorText = { color: '#df1c1c', fontSize: '13px', fontWeight: 'bolder' }

        return (
            <div className="container-fluid">
                <div className="row">

                    <div className="col-sm-5">
                        <div style={formBox}>
                            <div className="row pl-3 mt-3">
                                <h5>TRANSACTION DETAILS</h5>
                            </div>
                            <hr />
                            <form onSubmit={this.handleSubmit}>
                                <div className="row pb-2" style={alignLeft}>
                                    <div className="col-sm-4">
                                        <label>Transaction Type<span style={errorText}>*</span></label>
                                    </div>
                                    <div className="col-sm-6">
                                        <select type="text" className="form-control"
                                            value={TransactionType}
                                            onChange={event => this.handleChange(event, 'TransactionType', 'ttRequired')}>
                                            <option value={T_TYPE.default}>None</option>
                                            <option value={T_TYPE.inout}>{T_TYPE.inout}</option>
                                            <option value={T_TYPE.outin}>{T_TYPE.outin}</option>
                                        </select>
                                        {ttRequired ? (<span style={errorText}>Please enter transaction type!!</span>) : null}
                                    </div>
                                </div>
                                <div className="row pb-2" style={alignLeft}>
                                    <div className="col-sm-4">
                                        <label>Airport<span style={errorText}>*</span></label>
                                    </div>
                                    <div className="col-sm-6">
                                        <select type="text" className="form-control"
                                            value={AirportId}
                                            onChange={event => this.handleChange(event, 'AirportId', 'apRequired')}>
                                                <option value="none">None</option>
                                               {
                                                   airportIdNameList.map((airport) => 
                                                        <option key={airport.AiportId} value={airport.AirportId}>{airport.AirportName}</option>
                                                   )
                                               } 
                                        </select>
                                        {apRequired ? (<span style={errorText}>Please enter Airport!!</span>): null}
                                    </div>
                                </div>
                                <div className="row pb-2" style={alignLeft}>
                                    <div className="col-sm-4">
                                        <label>Aircraft<span style={errorText}>*</span></label>
                                    </div>
                                    <div className="col-sm-6">
                                        <select type="text" className="form-control"
                                            value={AircraftId}
                                            onChange={event => this.handleChange(event, 'AircraftId', 'acRequired')}>
                                                <option value="none">None</option>
                                               {
                                                   aircraftIdNumberList.map((aircraft) => 
                                               <option key={aircraft.AircraftId} value={aircraft.AircraftId}>{aircraft.AircraftNumber}</option>
                                                   )
                                               } 
                                        </select>
                                        {acRequired ? (<span style={errorText}>Please enter Aircraft!!</span>): null}
                                    </div>
                                </div>
                                <div className="row pb-2 pt-3" style={alignLeft}>
                                    <div className="col-sm-4">
                                        <label>Quantity<span style={errorText}>*</span></label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="number" className="form-control"
                                            value={Quantity}
                                            onChange={event => this.handleChange(event, 'Quantity', 'qRequired', 'qWrong')}></input>
                                        {qRequired ? (<span style={errorText}>Please enter quantity!!</span>) : null}
                                        {qWrong ? (<span style={errorText}>Quantity exceeds the limit!!</span>) : null}
                                    </div>

                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-4">
                                    </div>
                                    <div className="col-sm-6 mt-2 mb-3" style={alignLeft}>
                                        <button className="btn btn-secondary" type="submit">Add Transaction</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>

                    <div className="col-sm-7">
                        <div style={table}>
                            <div className="row pl-3 mt-3 mb-3">
                                <h5>TRANSACTION LIST</h5>
                            </div>
                            <TransactionTable data={
                                {
                                    listOfTransactions: this.state,
                                    reverseTransactionId: this.addReverseTransaction.bind(this)
                                }} />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default transactions
