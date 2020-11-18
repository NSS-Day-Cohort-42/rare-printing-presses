import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./rare.jpeg"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CategoryIcon from '@material-ui/icons/Category';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PersonIcon from '@material-ui/icons/Person';



export const NavBar = () => {
    return (
        <ul className="navbar">
            <li className="navbarTitle">
                Rare.
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/posts"><div className ="icon"><MailOutlineIcon style={{ fontSize: 28 }} />All Posts</div></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/userposts"><div className ="icon"><VisibilityIcon style={{ fontSize: 28 }} />Your Posts</div></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/categories"><div className ="icon"><CategoryIcon style={{ fontSize: 28 }} />Category Manager</div></Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/tag"><div className ="icon"><LoyaltyIcon style={{ fontSize: 28 }} />Tags</div> </Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/subscriptions"><div className ="icon"><AddCircleOutlineIcon style={{ fontSize: 28 }} />Subscriptions</div> </Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/userprofiles"><div className ="icon"><PersonIcon style={{ fontSize: 28 }} />User Profiles</div> </Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/logout"><div className ="icon"><ExitToAppIcon style={{ fontSize: 28 }} />Logout</div></Link>
            </li>
        </ul>
    )
}
