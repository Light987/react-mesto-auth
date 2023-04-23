import React from "react"
import logo from '../images/logo.svg';
import {Link, useLocation} from "react-router-dom";

function Header(props) {
    const {pathname} = useLocation();

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Место Россия"/>

            {pathname === "/react-mesto-auth" && (
                <ul className="header__nav-menu">
                    {pathname === '/react-mesto-auth' && <li className="header__nav-link header__nav-link_medium">
                        <a className="header__nav-link header__nav-link_medium"
                           href={props.email}>{props.email}</a>
                    </li>}
                    {pathname === '/react-mesto-auth' && <li>
                        <div className="header__nav-link" onClick={props.onSignout}>Выйти</div>
                    </li>}
                    {pathname === '/sign-in' &&
                        <li><Link to="/signup" className="header__nav-link">Регистрация</Link></li>}
                    {pathname === '/sign-up' &&
                        <li><Link to="/signin" className="header__nav-link">Войти</Link></li>}
                </ul>
            )}

        </header>
    )
}

export default Header