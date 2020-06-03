import React, { Component } from 'react'
import AirportTable from '../Airport/airportTable';

export class airport extends Component {
    constructor(props) {
        super();
        this.state = {  
            AirportId: 0,          
            AirportName: "",
            fuelCapacity: 0.0,
            fuelAvailable: 0.0,

            editAirportId: 0,

            anRequired: false,
            fcRequired: false,
            faRequired: false,

            airportList: []
        }

    }

    componentDidMount() {
        this.setState({ airportList: this.props.data.airportList }, () => {console.log(this.state.airportList)})
        console.log("airportlist:")
        console.log(this.state.airportList)
    }

    handleChange = (event, fieldName, requiredField) => {
        this.setState({ [fieldName]: event.target.value, [requiredField]: false })
    }

    validateForm() {
        let canSubmit = true;
        if (this.state.AirportName === '' || this.state.AirportName === null || this.state.AirportName === undefined) {
            this.setState({anRequired: true})
            canSubmit = false;
        }
        if (parseInt(this.state.fuelCapacity) === 0 || this.state.fuelCapacity === '') {
            this.setState({fcRequired: true})
            canSubmit = false;
        }
        if (parseInt(this.state.fuelAvailable) === 0 || this.state.fuelAvailable === '') {
            this.setState({faRequired: true})
            canSubmit = false;
        }
        return canSubmit;
    }

    clearForm() {
        this.setState({
            AirportId: 0,
            AirportName: "",
            fuelCapacity: 0.0,
            fuelAvailable: 0.0
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(this.validateForm()) {
            if (this.state.editAirportId > 0) {
                let index = this.state.airportList.findIndex(x => x.AirportId == this.state.editAirportId);
                if (index) {
                    let list = this.state.airportList
                    list[index].AirportName = this.state.AirportName
                    list[index].fuelCapacity = this.state.fuelCapacity
                    list[index].fuelAvailable = this.state.fuelAvailable

                    this.setState({ airportList: list })
                    alert("Airport Updated")
                    this.clearForm()
                }
            }
            else {
                let aList = this.state.airportList;
                let len = aList.length;
                aList.push({
                    'AirportId': len + 1,
                    'AirportName': this.state.AirportName,
                    'fuelCapacity': this.state.fuelCapacity,
                    'fuelAvailable': this.state.fuelAvailable
                })
                this.setState({
                    airportList: aList
                })
                alert("Airport Added");
                this.clearForm()
            }
        }
    }

    getAirportId(id) {
        this.setState({ editAirportId: id })
        console.log(id)
        let airport = this.state.airportList.find(x => x.AirportId == id)
        console.log(airport)
        this.setState({
            AirportName: airport.AirportName,
            fuelCapacity: airport.fuelCapacity,
            fuelAvailable: airport.fuelAvailable
        })
    }

    render() {

        const { AirportName, fuelCapacity, fuelAvailable, anRequired, fcRequired, faRequired, editAirportId } = this.state;
        
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
        if (editAirportId > 0) {
            button = <button className="btn btn-secondary" type="submit">Update Airport</button>
        }
        else {
            button = <button className="btn btn-secondary" type="submit">Add Airport</button>
        }

        return (
            <div className="container-fluid">
                <div className="row">

                    <div className="col-sm-5">
                        <div style={formBox}>
                            <div className="row pl-3 mt-3">
                                <h5>AIRPORT DETAILS</h5>
                            </div>
                            <hr />
                            <form onSubmit={this.handleSubmit}>
                                <div className="row pb-2 pt-3" style={alignLeft}>
                                    <div className="col-sm-4">
                                        <label>Airport Name<span style={errorText}>*</span></label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control"
                                            placeholder="Enter Airport Name"
                                            value={AirportName}
                                            onChange={event => this.handleChange(event, 'AirportName', 'anRequired')}></input>
                                        { anRequired ? (<span style={errorText}>Please enter airport name!!</span>): null}
                                    </div>
                                    
                                </div>
                                <div className="row pb-3" style={alignLeft}>
                                    <div className="col-sm-4" style={alignLeft}>
                                        <label>Fuel Capacity<span style={errorText}>*</span></label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input className="form-control" type="number" step={0.1}
                                            value={fuelCapacity}
                                            onChange={event => this.handleChange(event, 'fuelCapacity', 'fcRequired')}></input>
                                        { fcRequired ? (<span style={{color:'#df1c1c',fontSize: '13px',fontWeight:'bolder'}}>Please enter fuel capacity!!</span>): null}
                                    </div>
                                </div>
                                <div className="row pb-3" style={alignLeft}>
                                    <div className="col-sm-4" style={alignLeft}>
                                        <label>Fuel Available<span style={errorText}>*</span></label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input className="form-control" type="number" step={0.1}
                                            value={fuelAvailable}
                                            onChange={event => this.handleChange(event, 'fuelAvailable', 'faRequired')}></input>
                                        { faRequired ? (<span style={{color:'#df1c1c',fontSize: '13px',fontWeight:'bolder'}}>Please enter fuel available!!</span>): null}
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
                                <h5>AIRPORT LIST</h5>
                            </div>
                            <AirportTable data={
                                {
                                    listOfAirports: this.state,
                                    getAirportId: this.getAirportId.bind(this)
                                }} />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default airport
