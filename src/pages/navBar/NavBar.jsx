import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/Authcontext";
import LogoutButton from "../LogoutButton";

const NavBar = () => {
    const { authUser } = useAuthContext();
  
    return (
        <div >
            <nav className="navbar">
                <div className="logo">
                    <Link to="/dashboard">
                        <img
                            src="https://cdn.glitch.global/02a02e56-c6dd-4845-b7d3-20bc8ccecb0c/home-logo.png?v=1726478095386"
                            alt="Srini Property Services Logo"
                            title="Srini Property Services Logo"
                            height="50px"
                            loading="lazy"
                        />
                        <h1><strong>GGP Community</strong></h1>
                    </Link>
                </div>

                <ul className="nav-links">
                    <li><Link to="/dashboard" >Home</Link></li>
                    <li><Link to="/workshopList">WorkShops List</Link></li>

                    <li><Link to="/employeeList">Jobs List</Link></li>
                    <li>{authUser.username}</li>
                    <li><LogoutButton /></li>
                </ul>
              

            </nav>
          
        </div>
    )
}

export default NavBar;
