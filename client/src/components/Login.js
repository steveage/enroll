import { useState } from "react";

function Login( { credentialsCreated } ) {
    const emptyCredentials = {
        email: '',
        password: ''
    };
    const [ credentials, setCredentials ] = useState(  emptyCredentials );

    function handleSubmit( event ) {
         event.preventDefault();
         credentialsCreated( credentials );
         setCredentials( emptyCredentials );
    }

    function handleInputChange( event ) {
        setCredentials ( { ...credentials, [ event.target.name ]: event.target.value } );
    }

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit = { handleSubmit }>
                <input name = 'email' type = 'text' onChange = { handleInputChange } value = { credentials.email }></input>
                <input name = 'password' type = 'password' onChange = { handleInputChange } value = { credentials.password }></input>
                <input type = 'submit' ></input>
            </form>
        </div>
    )
}

export default Login;