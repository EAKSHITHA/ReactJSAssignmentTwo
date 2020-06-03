import React, { Component } from 'react'
import Navbar from '../Components/Common/Navbar'
import Footer from '../Components/Common/Footer'
import Login from '../Components/Account/login'
import Airport from './Airport/airport'
import Aircraft from './Aircraft/aircraft'
import Report from './Transactions/Reports/reports'
import Transaction from './Transactions/transactions'
import AirportData from '../Database/airport.json'
import AircraftData from '../Database/aircraft.json'
import TransactionData from '../Database/transaction.json'
// import { Provider } from 'react-redux'
// import store from '../Redux/Airport/store'

export class Home extends Component {
    constructor() {
        super();
        this.state = {
            initialize: false,
            ComponentName: '',
            AirportList: [],
            AircraftList: [],
            TransactionList: []
        }
    }

    componentDidMount() {
        //this.initializeData();
    }

    initializeData = () => {
        this.setState({
            initialize: true,
            AirportList: AirportData,
            AircraftList: AircraftData,
            TransactionList: TransactionData
        })
    }

    renderComponent(comp) {
        this.setState({ComponentName: comp })
    }

    render() {
        let renderData = null
            if(this.state.ComponentName == 'Airport') {
                if(this.state.initialize) {
                    renderData = <Airport data={{ airportList: this.state.AirportList}}/>
                }
                else {
                    alert("Initialize to visit Airport")
                    // renderData = <Airport data={{ airportList: []}}/>
                }
            }
            else if(this.state.ComponentName == 'Aircraft') {
                if(this.state.initialize) {
                    renderData = <Aircraft data={{ aircraftList: this.state.AircraftList}}/>
                }
                else {
                    alert("Initialize to visit Aircrafts")
                    // renderData = <Aircraft data={{ aircraftList: []}}/>
                }
            }
            else if(this.state.ComponentName == 'Transaction') {
                if(this.state.initialize) { 
                    renderData = <Transaction data={{ airportList: this.state.AirportList, aircraftList:this.state.AircraftList,
                        transactionList: this.state.TransactionList}}/>
                }
                else {
                    alert("Initialize to visit Transactions")
                    // renderData = <Transaction data={{ airportList: [], aircraftList:[],
                    //     transactionList: []}} />
                }

            }
            else if(this.state.ComponentName == 'Report') {
                if(this.state.initialize) {
                    renderData = <Report data={{ airportList: this.state.AirportList, aircraftList:this.state.AircraftList,
                        transactionList: this.state.TransactionList}}/>
                }
                else {
                    alert("Initialize to visit Reports")
                    // renderData = <Report data={{ airportList: [], aircraftList: [],
                    //     transactionList: []}}/>
                }
            }

        return (
            <div>
                <Navbar data = {{renderComponent: this.renderComponent.bind(this)}}/>
                {/* <Provider store = {store}> */}
                <div>
                    {/* <h2>Home</h2>
                    <button onClick={this.initializeData}>Initialize Data</button> */}
                    {renderData == null ? (
                        this.state.initialize === false ? (
                    <div><h2 style={{'paddingTop': '30px'}}>Click on Initialize to start the server load up the data into all the components</h2>
                    <br/><br/><button onClick={this.initializeData}>Initialize Data</button></div>
                    ) : 
                    (<h3 style={{'paddingTop': '30px'}}>Well Done, You are now all set to get started with the Airport Fuel Inventory!!</h3>)
                    ): renderData}
                </div>
                {/* </Provider> */}
                {/* <Footer /> */}
            </div>
        )
    }
}

export default Home
