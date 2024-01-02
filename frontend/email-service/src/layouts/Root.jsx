import { NavLink, Outlet } from "react-router-dom";
import './Root.css';

const Root = () => {
    return (
        <div>
            <div className="nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="registration">Registration</NavLink>
                <NavLink to="login" >Login</NavLink>
                <NavLink to="logout">Logout</NavLink>
            </div>
            <Outlet></Outlet>
        </div>
    );
}
export default Root;