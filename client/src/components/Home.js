import { useContext } from 'react';
import { HomeContext } from './App';

function Home( { user, handleLogout } ) {
    const homeErrors = useContext( HomeContext );
    const userMessage = user==null ? "Please log in." : `Welcome, ${ user.first_name }.`;

    const errorListUi = homeErrors?.map( error => <p key = { error } >{ error }</p>)

    return (
        <div>
            <div> { errorListUi } </div>
            <p> { userMessage } </p>
            <button onClick = { handleLogout }>Logout</button>
        </div>
    )
}

export default Home;