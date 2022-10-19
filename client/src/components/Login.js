import { useState } from "react";

function Login( { credentialsCreated, errors } ) {
    const emptyCredentials = {
        email: '',
        password: ''
    };
    const [ credentials, setCredentials ] = useState(  emptyCredentials );

    async function handleSubmit( event ) {
        event.preventDefault();
        credentialsCreated( credentials );
        setCredentials( emptyCredentials );
    }

    const errorListUi = errors?.map( error => <p key = { error } >{ error }</p>)

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
            <p>{ errorListUi }</p>
        </div>
    )
}

export default Login;