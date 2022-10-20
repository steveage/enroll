import { useContext, useState } from 'react';
import StudentCard from './StudentCard';
import { StudentContext } from './App';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';

function Student( { students, studentAdded } ) {
    const studentErrors = useContext( StudentContext );
    const formObject = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'student'
    };
    const [ formData, setFormData ] = useState( formObject );

    function handleSubmit( event ) {
        event.preventDefault();
        studentAdded( formData );
        setFormData( formObject );
    }

    function handleChange( event ) {
        setFormData( { ...formData, [ event.target.name ]: event.target.value } );
    }

    const studentListUi = students.map( (student, index) => <StudentCard key = { student.id } student = { student } index = { index } />);
    const errorListUi = studentErrors?.map( error => <Alert variant = 'danger' key = {error}>{error}</Alert>)

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='formBasicFirstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name='first_name' value={formData.first_name} onChange = {handleChange} type={'text'} placeholder = 'Enter first name' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicLastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name='last_name' value={formData.last_name} onChange = {handleChange} type={'text'} placeholder = 'Enter last name' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control name='email' value={formData.email} onChange = {handleChange} type={'email'} placeholder = 'Enter email address' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' value={formData.password} onChange = {handleChange} type={'password'} placeholder = 'Enter password' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPasswordConfirmation'>
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control name='password_confirmation' value={formData.password_confirmation} onChange = {handleChange} type={'password'} placeholder = 'Enter password confirmation' />
                </Form.Group>
                <div>{ errorListUi }</div>
                <Button className='mb-4' variant = 'primary' type='submit'>
                    Submit
                </Button>
            </Form>
            <h3>School's Students:</h3>
            <Accordion defaultActiveKey='0'>
                <div> { studentListUi } </div>
            </Accordion>
        </div>
    )
}

export default Student;