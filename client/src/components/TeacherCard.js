import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';

function TeacherCard( { teacher, index } ) {
    // const courseListUi = teacher.courses.map( course => <li key = { course.id }>
    //     <h4> { course.name } </h4>
    //     <p> { course.code } - { course.section } </p>
    //     <p> { course.semester.year } { course.semester.period }</p>
    // </li>  )
    const courseListUi = teacher.courses.map( course =>
        <Card className='mb-2' style={{width:'18rem'}} bg={'secondary'} key={ course.id } text = {'white'}>
            <Card.Body>
                <Card.Title> { course.name } </Card.Title>
                <Card.Subtitle className='mb-2'> { course.code } - { course.section } </Card.Subtitle>
                <Card.Text>
                    { course.semester.year } { course.semester.period }
                </Card.Text>
            </Card.Body>
        </Card>
        )

    return (
        // <div>
        //     <h4>{ `${ teacher.first_name } ${ teacher.last_name }`} </h4>
        //     <p style = { { 'fontStyle': 'italic' } } > { teacher.email } </p>
        //     <ul> { courseListUi } </ul>
        // </div>
        <Accordion.Item eventKey = { index }>
            <Accordion.Header>
                <h4><FaChalkboardTeacher/> {`${ teacher.first_name } ${ teacher.last_name }`}</h4>
            </Accordion.Header>
            <Accordion.Body>
                <p style = { { 'fontStyle': 'italic' } } ><AiOutlineMail/> { teacher.email } </p>
                { courseListUi }
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default TeacherCard;