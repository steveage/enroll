import { useState } from 'react';
import StudentCard from './StudentCard';

function Student( { students, studentAdded } ) {
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

    const studentListUi = students.map( student => <li key = { student.id }><StudentCard key = { student.id } student = { student } /></li>);

    return (
        <div>
            <form onSubmit = { handleSubmit }>
                <label>
                    First Name:
                    <input type = { 'text' } name = 'first_name' value = { formData.first_name } onChange = { handleChange } />
                </label>
                <label>
                    Last Name:
                    <input type = { 'text' } name = 'last_name' value = { formData.last_name } onChange = { handleChange } />
                </label>
                <label>
                    Email:
                    <input type = { 'email' } name = 'email' value = { formData.email } onChange = { handleChange } />
                </label>
                <label>
                    Password:
                    <input type = { 'password' } name = 'password' value = { formData.password } onChange = { handleChange } />
                </label>
                <label>
                    Password Confirmation:
                    <input type = { 'password' } name = 'password_confirmation' value = { formData.password_confirmation } onChange = { handleChange } />
                </label>
                <button type = { 'submit' }>Add Student</button>
            </form>
            <h3>School's Students:</h3>
            <ul> { studentListUi } </ul>
        </div>
    )
}

export default Student;