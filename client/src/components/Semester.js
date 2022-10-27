import { useContext, useState } from 'react';
import SemesterCard from './SemesterCard';
import { SemesterContext } from './App';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { IoCalendarOutline } from 'react-icons/io5';

function Semester( { semesters, semesterAdded } ) {
    const semesterErrors = useContext( SemesterContext );
    const formObject = {
        year: 2022,
        period: 'summer'
    };
    const [ formData, setFormData ] = useState( formObject );

    function handleSubmit( event ) {
        event.preventDefault();
        semesterAdded( formData );
        setFormData( formObject );
    }

    function handleChange( event ) {
        setFormData( { ...formData, [ event.target.name ]: event.target.value } );
    }

    const semesterListUi = semesters.map( semester => <SemesterCard key = { semester.id } semester = { semester } />);
    const errorListUi = semesterErrors?.map( error => <Alert variant = 'danger' key = { error } >{ error }</Alert>);

    function periodOptionsUi() {
        return [ 
            <option key = 'spring' value = 'spring' >spring</option>,
            <option key = 'summer' value = 'summer' >summer</option>,
            <option key = 'fall' value = 'fall' >fall</option>
        ]
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='formBasicYear'>
                    <Form.Label>Year</Form.Label>
                    <Form.Control name='year' type='number' placeholder='Enter year' value = { formData.year } onChange = { handleChange } />
                    <Form.Text className='text-muted'>
                        Please enter current or upcomming year only.
                    </Form.Text>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicSemester'>
                    <Form.Label>Semester</Form.Label>
                    <Form.Select name = 'period' value = { formData.period } onChange = { handleChange }>
                        { periodOptionsUi() }
                    </Form.Select>
                </Form.Group>
                <div>{ errorListUi } </div>
                <Button variant='primary' type='submit' className='mb-4'>
                    Submit
                </Button>
            </Form>
            <h3><IoCalendarOutline/> School's semesters:</h3>
            <div> { semesterListUi } </div>
        </div>
    )
}

export default Semester;