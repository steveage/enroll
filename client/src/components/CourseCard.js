import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { IoSchoolSharp } from 'react-icons/io5';
import { MdOutlineTopic } from 'react-icons/md'
import { IoCalendarOutline } from 'react-icons/io5';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';

function CourseCard( { course, index } ) {
    const studentListUi = course.students.map( student => 
        <Card className='mb-2' style={{width: '24rem'}} bg = {'secondary'} key = { student.id } text = {'white'}>
            <Card.Body>
                <Card.Title>{ student.first_name } { student.last_name }</Card.Title>
                <Card.Subtitle className='mb-2'>
                    <p style = { { 'fontStyle': 'italic' } } ><AiOutlineMail/> { student.email } </p>
                </Card.Subtitle>
            </Card.Body>
        </Card>
        )

    return (
        <Accordion.Item eventKey= { index }>
            <Accordion.Header>
                <h4>{ course.name } </h4>
            </Accordion.Header>
            <Accordion.Body>
                <p><MdOutlineTopic/> { course.code } - { course.section }</p>
                <p><IoCalendarOutline/> { course.semester.year } { course.semester.period }</p>
                <p><FaChalkboardTeacher/> { course.teacher.first_name } { course.teacher.last_name }</p>
                <p><IoSchoolSharp/> Students</p>
                { studentListUi }
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default CourseCard;