import React, { Component } from 'react'
import { AIRLINE } from '../../_services/_utils/utils';
import AircraftTable from '../Aircraft/aircraftTable';

export class aircraft extends Component {
    constructor(props) {
        super();
        this.state = {  
            AircraftId: 0,
            AircraftNumber: '',
            Airline: AIRLINE.default,

            editAircraftId: 0,

            anExists: false,
            anRequired: false,
            alRequired: false,

            aircraftList: [],
            
            aircraftNumberList: []
        }

    }

    componentDidMount() {
        console.log("aircraftlist:")
        console.log(this.state.aircraftList)
        this.setState({ aircraftList: this.props.data.aircraftList }, () => {
            let numberList = []
            this.state.aircraftList.map((aircraft) => {
                numberList.push(aircraft.AircraftNumber.toUpperCase())
            });
            this.setState({aircraftNumberList : numberList}, () => {console.log(this.state.aircraftNumberList)})
        })
    }

    handleChange = (event, fieldName, requiredField, existField) => {
        this.setState({ [fieldName]: event.target.value, [requiredField]: false, [existField]: false })
    }

    validateForm() {
        let canSubmit = true;
        if (this.state.AircraftNumber === '' || this.state.AircraftNumber === null || this.state.AircraftNumber === undefined ) {
            this.setState({anRequired: true})
            canSubmit = false;
        }
        if(this.state.aircraftNumberList.includes(this.state.AircraftNumber.toUpperCase())) {
            this.setState({anExists: true})
            canSubmit = false;
        }
        if (this.state.Airline === '' || this.state.Airline === null || this.state.Airline === undefined || this.state.Airline === 'none') {
            if(this.state.Airline == AIRLINE.goair || this.state.Airline == AIRLINE.airindia || 
                this.state.Airline == AIRLINE.indigo || this.state.Airline == AIRLINE.spicejet)
            this.setState({alRequired: true})
            canSubmit = false;
        }
        return canSubmit;
    }

    clearForm() {
        this.setState({
            AircraftId: 0,
            AircraftNumber: '',
            Airline: AIRLINE.default
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(this.validateForm()) {
            if (this.state.editAircraftId > 0) {
                let index = this.state.aircraftList.findIndex(x => x.AircraftId == this.state.editAircraftId);
                if (index) {
                    let list = this.state.aircraftList
                    list[index].AircraftNumber = this.state.AircraftNumber.toUpperCase()
                    list[index].Airline = this.state.Airline

                    this.setState({ aircraftList: list })
                    alert("Aircraft Updated")
                    this.clearForm()
                }
            }
            else {
                let aList = this.state.aircraftList;
                let len = aList.length;
                aList.push({
                    'AircraftId': len + 1,
                    'AircraftNumber': this.state.AircraftNumber.toUpperCase(),
                    'Airline': this.state.Airline
                })
                this.setState({
                    aircraftList: aList
                }, (alist) => {console.log(alist)})
                alert("Aircraft Added");
                this.clearForm()
            }
        }
    }

    getAircraftId(id) {
        this.setState({ editAircraftId: id })
        console.log(id)
        let aircraft = this.state.aircraftList.find(x => x.AircraftId == id)
        console.log(aircraft)
        this.setState({
            AircraftNumber: aircraft.AircraftNumber,
            Airline: aircraft.Airline
        })
    }

    render() {

        const { AircraftNumber, Airline, anRequired, anExists, alRequired, editAircraftId } = this.state;
        
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
        const errorText = {color:'#df1c1c',fontSize: '13px',fontWeight:'bolder'}

        let button;
        if (editAircraftId > 0) {
            button = <button className="btn btn-secondary" type="submit">Update Aircraft</button>
        }
        else {
            button = <button className="btn btn-secondary" type="submit">Add Aircraft</button>
        }

        return (
            <div className="container-fluid">
                <div className="row">

                    <div className="col-sm-5">
                        <div style={formBox}>
                            <div className="row pl-3 mt-3">
                                <h5>AIRCRAFT DETAILS</h5>
                            </div>
                            <hr />
                            <form onSubmit={this.handleSubmit}>
                                <div className="row pb-2 pt-3" style={alignLeft}>
                                    <div className="col-sm-4">
                                        <label>Aircraft Number<span style={errorText}>*</span></label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control"
                                            placeholder="Enter Aircraft Number"
                                            value={AircraftNumber}
                                            onChange={event => this.handleChange(event, 'AircraftNumber', 'anRequired', 'anExists')}></input>
                                        { anRequired ? (<span style={errorText}>Please enter aircraft number!!</span>): null}
                                        { anExists ? (<span style={errorText}>This Aircraft already exists!!</span>): null}
                                    </div>
                                    
                                </div>
                                <div className="row pb-2" style={alignLeft}>
                                    <div className="col-sm-4">
                                        <label>Airline<span style={errorText}>*</span></label>
                                    </div>
                                    <div className="col-sm-6">
                                        <select type="text" className="form-control"
                                            value={Airline}
                                            onChange={event => this.handleChange(event, 'Airline', 'alRequired')}>
                                            <option value={AIRLINE.default}>None</option>
                                            <option value={AIRLINE.goair}>{AIRLINE.goair}</option>
                                            <option value={AIRLINE.indigo}>{AIRLINE.indigo}</option>
                                            <option value={AIRLINE.spicejet}>{AIRLINE.spicejet}</option>
                                            <option value={AIRLINE.airindia}>{AIRLINE.airindia}</option>
                                        </select>
                                        {alRequired ? (<span style={errorText}>Please choose an Airline!!</span>): null}
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-sm-4">
                                    </div>
                                    <div className="col-sm-6 mt-2 mb-3" style={alignLeft}>
                                        {button}
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>

                    <div className="col-sm-7">
                        <div style={table}>
                        <div className="row pl-3 mt-3 mb-3">
                                <h5>AIRCRAFT LIST</h5>
                            </div>
                            <AircraftTable data={
                                {
                                    listOfAircrafts: this.state,
                                    getAircraftId: this.getAircraftId.bind(this)
                                }} />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default aircraft
