import { NavLink } from 'react-router-dom';
import styles from './../styles/navbar.styles.css';

function NavBar() {
    let linkStyle = isActive => isActive? 'active' : 'inactive';
    
    return (
        <div>
            < NavLink to = '/' className = { ({isActive}) => linkStyle(isActive) }>Home</NavLink>
            < NavLink to = '/course' className = { ({isActive}) => linkStyle(isActive) }>Course</NavLink>
            < NavLink to = '/enrollment' className = { ({isActive}) => linkStyle(isActive) }>Enrollment</NavLink>
            < NavLink to = '/Login' className = { ({isActive}) => linkStyle(isActive) }>Login</NavLink>
            < NavLink to = '/Semester' className = { ({isActive}) => linkStyle(isActive) }>Semester</NavLink>
            < NavLink to = '/Teacher' className = { ({isActive}) => linkStyle(isActive) }>Teacher</NavLink>
            < NavLink to = '/Student' className = { ({isActive}) => linkStyle(isActive) }>Student</NavLink>
        </div>
    )
}

export default NavBar;