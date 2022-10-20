import { useState, useContext } from "react";
import { UserContext } from "./App";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

function Login( { credentialsCreated } ) {
    const userErrors = useContext( UserContext );
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

    const errorListUi = userErrors?.map( error => <Alert variant="danger" key = { error } >{ error }</Alert>);

    function handleInputChange( event ) {
        setCredentials ( { ...credentials, [ event.target.name ]: event.target.value } );
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" value = {credentials.email} onChange = {handleInputChange} type={'email'} placeholder = 'Enter email address' />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name = "password" value={credentials.password} onChange = { handleInputChange } type = {'password'} placeholder = 'Enter password' />
                </Form.Group>
                <Button className="mb-4" variant = 'primary' type="submit">
                    Submit
                </Button>
            </Form>
            { errorListUi }
        </div>
    )
}

export default Login;