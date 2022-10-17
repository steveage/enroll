import { useState } from 'react';
import EnrollmentCard from './EnrollmentCard';

function Enrollment( { enrollments, students, courses, enrollmentAdded, deleteEnrollment, updateEnrollment } ) {
    const emptyEnrollment = {
        user_id: 0,
        course_id: 0,
        score: ''
    }
    const [ formData, setFromData ] = useState( emptyEnrollment );

    function handleSubmit( event ) {
        event.preventDefault();
        enrollmentAdded( formData );
        setFromData( emptyEnrollment );
    }

    function handleChange( event ) {
        setFromData( { ...formData, [ event.target.name ]: event.target.value } );
    }

    const enrollmentsListUi = enrollments.map( enrollment => <li key = { enrollment.id }><EnrollmentCard key = { enrollment.id } enrollment = { enrollment } deleteEnrollment = { deleteEnrollment } updateEnrollment = { updateEnrollment } /></li>)

    const studentsOptionsUi = students.map( student => <option key = { student.id } value = { student.id }>{ student.first_name } { student.last_name }</option>)

    const coursesOptionsUi = courses.map( course => <option key = { course.id } value = { course.id }>{ course.code } - { course.section }: { course.name }</option>)

    return (
        <div>
            <form onSubmit = { handleSubmit }>
                <label>
                    Student:
                    <select name = 'user_id' value = { formData.user_id } onChange = { handleChange }>
                        { studentsOptionsUi }
                    </select>
                </label>
                <label>
                    Course:
                    <select name = 'course_id' value = { formData.course_id } onChange = { handleChange }>
                        { coursesOptionsUi }
                    </select>
                </label>
                <label>
                    Score:
                    <input type = { 'text' } name = 'score' value = { formData.score } onChange = { handleChange } /> 
                </label>
                <button type= { 'submit' }>Enroll</button>
            </form>
            <h3>Enrollments:</h3>
            <ul> { enrollmentsListUi } </ul>
        </div>
    )
}

export default Enrollment;