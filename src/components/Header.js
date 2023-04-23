import React from "react"
import logo from '../images/logo.svg';
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Место Россия"/>
            <div className="header__container">
                <span className="header__email">{props.email}</span>
                <Link
                    to={props.buttonLink}
                    onClick={props.onSignout}
                    className="header__link"
                    href="#">
                    {props.buttonText}
                </Link>
            </div>
        </header>
    )
}

export default Header