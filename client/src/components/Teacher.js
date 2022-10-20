import { useContext, useState } from 'react';
import TeacherCard from './TeacherCard';
import { TeacherContext } from './App';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';

function Teacher( { teachers, teacherAdded } ) {
    const teacherErrors = useContext( TeacherContext );
    const emptyTeacher = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'teacher'
    };
    const [ formData, setFormData ] = useState( emptyTeacher );

    function handleSubmit( event ) {
        event.preventDefault();
        teacherAdded( formData );
        setFormData( emptyTeacher );
    }

    function handleChange( event ) {
        setFormData({ ...formData, [ event.target.name ]: event.target.value } );
    }
    
    const teacherListUi = teachers.map( (teacher, index) => <TeacherCard key = { teacher.id } teacher = { teacher } index = { index } />);
    const errorListUi = teacherErrors?.map( error => <Alert variant = 'danger' key = { error } >{ error }</Alert>)

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
                { errorListUi }
                <Button className='mb-4' variant = 'primary' type='submit'>
                    Submit
                </Button>
            </Form>
            <h3>School's Teachers</h3>
            <Accordion defaultActiveKey='0'>
                { teacherListUi }
            </Accordion>
        </div>
    )
}

export default Teacher;