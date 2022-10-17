import { useState } from 'react';
import CourseCard from './CourseCard';

function Course( { courses, semesters, teachers, courseAdded } ) {
    const emptyCourse = {
        code: '',
        name: '',
        section: '',
        semester_id: 0,
        teacher_id: 0
    }

    const [formData, setFormData ] = useState( emptyCourse );

    function handleSubmit( event ) {
        event.preventDefault();
        courseAdded( formData );
        setFormData( emptyCourse );
    }

    function handleChange( event ) {
        setFormData( { ...formData, [ event.target.name ]: event.target.value } );
    }

    const courseListUi = courses.map( course => <li key = { course.id }><CourseCard key = { course.id } course = { course } /></li>);

    const semesterOptionsUi = semesters.map( semester => <option key = { semester.id } value = { semester.id }>{semester.year} - {semester.period}</option>)

    const teacherOptionsUi = teachers.map( teacher => <option key={ teacher.id } value = { teacher.id }>{ teacher.first_name } { teacher.last_name }</option>)

    return (
        <div>
            <form onSubmit = { handleSubmit } >
                <label>
                    Code:
                    <input type = { 'text' } name = 'code' value = { formData.code } onChange = { handleChange } />
                </label>
                <label>
                    Name:
                    <input type = { 'text' } name = 'name' value = { formData.name } onChange = { handleChange } />
                </label>
                <label>
                    Section:
                    <input type = { 'text' } name = 'section' data-value  = { formData.section } onChange = { handleChange } />
                </label>
                <label>
                    Semester:
                    <select name = 'semester_id' value = { formData.semester_id } onChange = { handleChange }>
                        { semesterOptionsUi }
                    </select>
                </label>
                <label>
                    Teacher:
                    <select name = 'teacher_id' value = { formData.teacher_id } onChange = { handleChange }>
                        { teacherOptionsUi }
                    </select>
                </label>
                <button type = { 'submit' }>Add course</button>
            </form>
            <h3>School's courses:</h3>
            <ul> { courseListUi } </ul>
        </div>
    )
}

export default Course;