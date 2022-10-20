import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar({ user }) {
    const signInUi = user==null ? <div>Signed out</div> : <div>Signed in as: <a href="login">{ user.first_name } { user.last_name }</a></div>;
    return (
        <Navbar bg = 'light' variant='light' expand = 'lg'>
            <Container>
                <Navbar.Brand href='/'>Enrollment-App</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id = 'basic-navbar-nav' className='justify-content-start'>
                    <Nav className='me-auto'>
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='Login'>Login</Nav.Link>
                        <Nav.Link href='course'>Course</Nav.Link>
                        <Nav.Link href='enrollment'>Enrollment</Nav.Link>
                        <Nav.Link href='semester'>Semester</Nav.Link>
                        <Nav.Link href='teacher'>Teacher</Nav.Link>
                        <Nav.Link href='student'>Student</Nav.Link>                        
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className='justify-content-end'>
                    <Navbar.Text>
                        { signInUi }
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;