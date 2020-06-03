import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        return (
            <div className="footer-background-color">
                <footer>
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                        <ul className="list-inline text-center">
                            <li className="list-inline-item">
                            <a href="/">
                                <span className="fa-stack fa-lg">
                                <i className="fa fa-circle fa-stack-2x"></i>
                                <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                            </li>
                            <li className="list-inline-item">
                            <a href="/">
                                <span className="fa-stack fa-lg">
                                <i className="fa fa-circle fa-stack-2x"></i>
                                <i className="fa fa-facebook-f fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                            </li>
                            <li className="list-inline-item">
                            <a href="/">
                                <span className="fa-stack fa-lg">
                                <i className="fa fa-circle fa-stack-2x"></i>
                                <i className="fa fa-github fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                            </li>
                        </ul>
                        <p className="copyright text-muted text-center">Copyright © Airport Fuel Inventory 2020</p>
                        </div>
                    </div>
                    </div>
                </footer>                
            </div>
        )
    }
}

export default Footer
