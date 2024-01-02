import { NavLink, Outlet } from "react-router-dom";
import './Root.css';
import { useEffect, useState } from "react";

const Root = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    
    useEffect(() => {
        setLoggedIn(localStorage.getItem("loggedIn"));
    }, []);

    return (
        <div>
            <div className="nav">
                <NavLink to="/">Home</NavLink>
                {!loggedIn && <NavLink to="registration">Registration</NavLink>}
                {!loggedIn && <NavLink to="login" >Login</NavLink>}
                {loggedIn && <NavLink to="logout">Logout</NavLink>}
            </div>
            <Outlet></Outlet>
        </div>
    );
}
export default Root;