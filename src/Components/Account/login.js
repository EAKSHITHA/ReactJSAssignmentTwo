import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import './login.css'
import { UserLoginDto } from '../../_services/_utils/models'
import userUtilities from '../../_services/_utils/user-utilities'
import loginData from '../../Database/user.json'



export class login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            toDashboard: false,
            userModel: new UserLoginDto(),
            emailRequired: false,
            passwordRequired: false
        }

    }

    handleChange(event, fieldRequired) {
        let inputName = event.target.name;
        let inputValue = event.target.value;
        let stateCopy = {...this.state};
        stateCopy.userModel[inputName] = inputValue;
        stateCopy[fieldRequired] = false;
        this.setState(stateCopy);
        console.log("handle change")
        console.log(this.state.userModel);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let user = {...this.state.userModel};
        //let { Username, Password } = this.state.userModel;
        if(user.Email == null || user.Email == "") {
            this.setState({emailRequired: true})
        }
        if(user.Password == null || user.Password == "") {
            this.setState({passwordRequired: true})
        }
        if(!this.state.emailRequired && !this.state.passwordRequired) {
            let validateUser = loginData.find(x => x.Email == user.Email && x.Password == user.Password);
            if(validateUser != null) {
                console.log("login successful")
                this.setState({ toDashboard: true });
            }
        }

    }

    render() {

        let { Email, Password } = this.state.userModel;
        let { emailRequired, passwordRequired } = this.state;

        const errorText = {color:'#df1c1c',fontSize: '13px',fontWeight:'bolder'}


        if (this.state.toDashboard === true) {
            return <Redirect to='/Home' />
        }

        return (
            <div className="login">
                <div>
                    <h3><span className="changing-text">Login</span> to dive into Airport Fuel Inventory!!</h3>
                </div>
                <form className="login-box" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="Email" className="form-control"
                            placeholder="Enter Email:" value={Email}
                            onChange={(event) => this.handleChange(event, 'emailRequired')} id="email" />
                        { emailRequired ? (<span style={errorText}>Please enter valid email!!</span>): null}
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" name="Password" className="form-control"
                            placeholder="Enter password" value={Password}
                            onChange={(event) => this.handleChange(event, 'passwordRequired')} id="pwd" />
                        { passwordRequired ? (<span style={errorText}>Please enter password!!</span>): null}
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}

export default login
