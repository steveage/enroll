import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';

function StudentCard( { student, index } ) {
    const courseListUi = student.student_courses.map( course =>
        <Card className = 'mb-2' style={{width:'18rem'}} bg={'secondary'} key = { course.id } text= {'white'}>
            <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Subtitle className='mb-2'>{course.code} - {course.section}</Card.Subtitle>
                <Card.Text>
                    <FaChalkboardTeacher/> { course.teacher.first_name } {course.teacher.last_name }
                </Card.Text>
            </Card.Body>
        </Card>
        )

    return (
            <Accordion.Item eventKey = { index }>
                <Accordion.Header>
                    <h4>{`${ student.first_name } ${ student.last_name }`}</h4>
                </Accordion.Header>
                <Accordion.Body>
                    <p style = { { 'fontStyle': 'italic' } } ><AiOutlineMail/> { student.email } </p>
                    { courseListUi }
                </Accordion.Body>
            </Accordion.Item>
    )
}

export default StudentCard;