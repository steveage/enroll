import { useContext, useState } from 'react';
import CourseCard from './CourseCard';
import { CourseContext } from './App';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';
import { MdOutlineTopic } from 'react-icons/md'

function Course( { courses, semesters, teachers, courseAdded } ) {
    const courseErrors = useContext( CourseContext );
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

    const courseListUi = courses.map( (course, index) => <CourseCard key = { course.id } course = { course } index = { index } />);
    const errorListUi = courseErrors?.map( error => <Alert key = { error } variant='danger'>{ error }</Alert>)
    const semesterOptionsUi = semesters.map( semester => <option key = { semester.id } value = { semester.id }>{semester.year} - {semester.period}</option>)
    const teacherOptionsUi = teachers.map( teacher => <option key={ teacher.id } value = { teacher.id }>{ teacher.first_name } { teacher.last_name }</option>)

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='formBasicCode'>
                    <Form.Label>Code</Form.Label>
                    <Form.Control name = 'code' value = { formData.code } onChange = { handleChange } type = {'text'} placeholder = 'Enter course code' />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control name = 'name' value = { formData.name } onChange = { handleChange } type = {'text'} placeholder = 'Enter course name' />
                </Form.Group>

                <Form.Group className = 'mb-3' controlId='formBasicSection'>
                    <Form.Label>Section</Form.Label>
                    <Form.Control name = 'section' value = { formData.section } onChange = { handleChange } type = {'text'} placeholder = 'Enter course section' />
                </Form.Group>

                <Form.Group className = 'mb-3' controlId='formBasicSemester'>
                    <Form.Label>Semester</Form.Label>
                    <Form.Select name = 'semester_id' vlaue = { formData.semester_id } onChange = { handleChange }>
                        { semesterOptionsUi }
                    </Form.Select>
                </Form.Group>

                <Form.Group className = 'mb-3' controlId='formBasicTeacher'>
                    <Form.Label>Teacher</Form.Label>
                    <Form.Select name = 'teacher_id' value = { formData.teacher_id } onChange = { handleChange }>
                        { teacherOptionsUi }
                    </Form.Select>
                </Form.Group>
                { errorListUi }
                <Button variant = 'primary' type = 'submit' className='mb-4'>
                    Submit
                </Button>
            </Form>
            <h3><MdOutlineTopic/> School's courses</h3>
            <Accordion defaultActiveKey='0'>
                { courseListUi }
            </Accordion>
        </div>
    )
}

export default Course;