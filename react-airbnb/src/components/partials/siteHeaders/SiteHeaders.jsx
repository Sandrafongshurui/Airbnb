import './siteHeader.css'
import { Link } from 'react-router-dom'
import React, { Component } from 'react';
import logo from '../../../assets/images/house.png';


export default class SiteHeader extends Component{
    state = {
        navState: false, 
    };

    toggleNav = () => {
        this.setState({navState: !this.state.navState});
    }
    
    render()
    {
        return (
            <div className='header'>

                <Link to='/'>
                    <img
                        className="header__icon"
                        src={logo}
                        alt=" Airbnb"
                    />
                </Link>

                <div className='header__center'>
                    <input type="text"/>
                </div>

                <div className='header__right'>
                    <span className="material-symbols-outlined" onClick={this.toggleNav}> account_circle </span>
                    {
                        this.state.navState &&
                        <div className="rightPop">
                            <p className="rightPopText">Register</p>
                            <p className="rightPopText">Login</p>
                        </div>
                    }

                </div>

                {/* token? */}
                {/*  {
                        token ? (
                                <li className="nav-link"><Link to="/profile">Profile</Link></li>
                            ) : (
                                <>
                                    <li className="nav-link"><Link to="/register">Register</Link></li>
                                    <li className="nav-link"><Link to="/login">Login</Link></li>
                                </>
                            )
                        } */}

            </div>
        )
    }
}