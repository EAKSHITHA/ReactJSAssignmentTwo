import React, { Component } from 'react'
import './common.css';

export class NavbaarUI extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogin: true
        }
    }

    render() {
        var loginLogout = null
        if(this.state.isLogin) {
            loginLogout = <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" href="#">Dummy</a>
            </li>
        </ul>
        }
        else {
            loginLogout = <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" onClick={() => {this.props.data.renderComponent('Login')}}>Login</a>
            </li>
        </ul>
        }
        

        return (
            <nav className="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
                <a className="navbar-brand" href="/">Airport Statistics</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav" >
                        <li className="nav-item"><a className="nav-link" href="#" onClick={() => {this.props.data.renderComponent('Airport')}}>Airports</a></li>
                        <li className="nav-item"><a className="nav-link" href="#" onClick={() => {this.props.data.renderComponent('Aircraft')}}>Aircrafts</a></li>
                        <li className="nav-item"><a className="nav-link" href="#" onClick={() => {this.props.data.renderComponent('Transaction')}}>All Transactions</a></li>
                        <li className="nav-item"><a className="nav-link" href="#" onClick={() => {this.props.data.renderComponent('Report')}}>Reports</a></li>
                    </ul>
                    {loginLogout}
                </div>
            </nav>
        )
    }
}

export default NavbaarUI
