import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { AiOutlineMail } from 'react-icons/ai';
import { IoCalendarOutline } from 'react-icons/io5';

function TeacherCard( { teacher, index } ) {
    const courseListUi = teacher.courses.map( course =>
        <Card className='mb-2' style={{width:'18rem'}} bg={'secondary'} key={ course.id } text = {'white'}>
            <Card.Body>
                <Card.Title> { course.name } </Card.Title>
                <Card.Subtitle className='mb-2'> { course.code } - { course.section } </Card.Subtitle>
                <Card.Text>
                    <IoCalendarOutline/> { course.semester.year } { course.semester.period }
                </Card.Text>
            </Card.Body>
        </Card>
        )

    return (
        <Accordion.Item eventKey = { index }>
            <Accordion.Header>
                <h4>{`${ teacher.first_name } ${ teacher.last_name }`}</h4>
            </Accordion.Header>
            <Accordion.Body>
                <p style = { { 'fontStyle': 'italic' } } ><AiOutlineMail/> { teacher.email } </p>
                { courseListUi }
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default TeacherCard;