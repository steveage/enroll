import Card from 'react-bootstrap/Card';

function SemesterCard( { semester } ) {

    return (
        <Card className = 'mb-2' style = {{ width: '18rem' }} bg = {'secondary'} key = { semester.id } text = {'white'}>
            <Card.Body>
                <Card.Title>{ semester.year }</Card.Title>
                <Card.Subtitle className='mb-2'> { semester.period }</Card.Subtitle>
            </Card.Body>
        </Card>
    )
}

export default SemesterCard;