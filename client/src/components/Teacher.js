import { useContext, useState } from 'react';
import TeacherCard from './TeacherCard';
import { TeacherContext } from './App';

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
    
    const teacherListUi = teachers.map( teacher => <li key = { teacher.id } ><TeacherCard key = { teacher.id } teacher = { teacher } /></li>);

    const errorListUi = teacherErrors?.map( error => <p key = { error } >{ error }</p>)

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
                <button type = { 'submit' }>Add Teacher</button>
            </form>
            <div>{ errorListUi }</div> 
            <h3>School's Teachers</h3>
            <ul> { teacherListUi } </ul>
        </div>
    )
}

export default Teacher;