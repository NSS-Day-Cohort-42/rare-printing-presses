import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CategoryIcon from '@material-ui/icons/Category';



export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <img className="navbar__logo" src={Logo} />
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/posts"><div className ="icon"><MailOutlineIcon style={{ fontSize: 28 }} />Posts</div></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/category"><div className ="icon"><CategoryIcon style={{ fontSize: 28 }} />Posts</div></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/tag"><div className ="icon"><LoyaltyIcon style={{ fontSize: 28 }} />Tags</div> </Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/logout"><div className ="icon"><ExitToAppIcon style={{ fontSize: 28 }} />Logout</div></Link>
            </li>
        </ul>
    )
}
