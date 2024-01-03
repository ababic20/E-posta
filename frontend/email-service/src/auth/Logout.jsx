import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("loggedIn")
        localStorage.removeItem("userId")
        navigate("/login")
    }, []);

    return null;
}

export default Logout;