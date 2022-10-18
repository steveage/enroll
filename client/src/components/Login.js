import { useState } from "react";

function Login( { credentialsCreated } ) {
    const loginUrl = '/login';
    const emptyCredentials = {
        email: '',
        password: ''
    };
    const [ credentials, setCredentials ] = useState(  emptyCredentials );
    const [ errorMessage, setErrorMessage ] = useState( '' );

    async function handleSubmit( event ) {
        event.preventDefault();
        // const loginResult = await credentialsCreated( credentials );
        // credentialsCreated( credentials );
        // setErrorMessage( loginResult );
        setCredentials( emptyCredentials );

        const response = await updateData ( "POST", loginUrl, credentials );
        if ( response.ok ) {
            const user = await response.json();
            credentialsCreated( user );
        //   setUser( user );
            setErrorMessage('');
        //   navigate( "/", { user: user, error: loginErrorMessage, handleLogout: handleLogout } );
        } else {
            credentialsCreated( null );
            setErrorMessage("Invalid email or password.");
        //   navigate( "/login", { credentialsCreated: onCredentialsCreated })
        }
    }

    async function updateData(action, url, data, dataSet, setDataFunction) {
        const stringData = JSON.stringify(data);
        const settings = {
          method: action,
          headers: { "Content-Type": "application/json" },
          body: stringData
        }
    
        return await fetch( url, settings );
      }

    function handleInputChange( event ) {
        setCredentials ( { ...credentials, [ event.target.name ]: event.target.value } );
    }

    return (
        <div>

            <form onSubmit = { handleSubmit }>
                <input name = 'email' type = 'text' onChange = { handleInputChange } value = { credentials.email }></input>
                <input name = 'password' type = 'password' onChange = { handleInputChange } value = { credentials.password }></input>
                <input type = 'submit' ></input>
            </form>
            <p>{ errorMessage }</p>
        </div>
    )
}

export default Login;