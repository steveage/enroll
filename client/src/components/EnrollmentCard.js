import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { IoSchoolSharp } from 'react-icons/io5';
import { MdOutlineTopic } from 'react-icons/md'
import { IoCalendarOutline } from 'react-icons/io5';
import { FaChalkboardTeacher } from 'react-icons/fa';


function EnrollmentCard( { enrollment, deleteEnrollment, updateEnrollment, index } ) { 
    const [ score, setScore ] = useState( enrollment.score );

    function handleChange ( event ) {
        setScore( event.target.value )
    }

    function handleSubmit() {
        enrollment.score = score;
        updateEnrollment( enrollment );
    }

    return (
        <Accordion.Item eventKey = { index }>
            <Accordion.Header>
                <h5><MdOutlineTopic/> { enrollment.course.code } - { enrollment.course.section }: { enrollment.course.name }</h5>
            </Accordion.Header>
            <Accordion.Body>
                <Row>
                    <Col>
                        <p><IoCalendarOutline/> { enrollment.course.semester.year } - { enrollment.course.semester.period }</p>
                        <p><FaChalkboardTeacher/> { enrollment.course.teacher.first_name } { enrollment.course.teacher.last_name }</p>
                        <p><IoSchoolSharp/> { enrollment.user.first_name } { enrollment.user.last_name }</p>
                    </Col>
                    <Col xs="auto">
                        <Button className='mb-4' variant='danger' onClick={ () => deleteEnrollment( enrollment ) }>Delete</Button>
                    </Col>
                </Row>
                <Form onSubmit={ handleSubmit }>
                    <Form.Group className='mb-3' controlId='formBasicScore'>
                        <Form.Label>Score</Form.Label>
                        <Form.Control name = 'score' type = { 'text' } value = { score } onChange = { handleChange } placeholder = 'Enter score' />
                    </Form.Group>
                    <Button className='mb-4' variant = 'primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default EnrollmentCard;