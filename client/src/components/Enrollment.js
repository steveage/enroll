import { useContext, useState } from 'react';
import EnrollmentCard from './EnrollmentCard';
import { EnrollmentContext } from './App';
import { GiArchiveRegister } from 'react-icons/gi';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';

function Enrollment( { enrollments, students, courses, enrollmentAdded, deleteEnrollment, updateEnrollment } ) {
    const enrollmentErrors = useContext( EnrollmentContext );
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
    const sortedEnrollments = enrollments.sort( (enrollment1, enrollment2 ) => enrollment1.course.id - enrollment2.course.id);
    const enrollmentsListUi = sortedEnrollments.map( (enrollment, index) => <EnrollmentCard key = { enrollment.id } enrollment = { enrollment } deleteEnrollment = { deleteEnrollment } updateEnrollment = { updateEnrollment } index = { index } />);

    const studentsOptionsUi = students.map( student => <option key = { student.id } value = { student.id }>{ student.first_name } { student.last_name }</option>)
    const coursesOptionsUi = courses.map( course => <option key = { course.id } value = { course.id }>{ course.code } - { course.section }: { course.name }</option>)
    const errorListUi = enrollmentErrors?.map( error => <Alert variant = 'danger' key = { error } >{ error }</Alert>)

    return (
        <div>
             <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId = 'formBasicStudent'>
                    <Form.Label>Student</Form.Label>
                    <Form.Select name = 'user_id' value = { formData.user_id } onChage = { handleChange }>
                        { studentsOptionsUi }
                    </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3' controlId = 'formBasicCourse'>
                    <Form.Label>Course</Form.Label>
                    <Form.Select name = 'course_id' value = { formData.course_id } onChange = { handleChange } >
                        { coursesOptionsUi }
                    </Form.Select>
                </Form.Group>
                { errorListUi }
                <Button variant='primary' type='submit' className='mb-4'>
                    Submit
                </Button>
             </Form>
            <h3><GiArchiveRegister/> Enrollments</h3>
            <Accordion defaultActiveKey='0'>
                { enrollmentsListUi }
            </Accordion>
        </div>
    )
}

export default Enrollment;