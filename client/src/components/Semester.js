import { useState } from 'react';
import SemesterCard from './SemesterCard';

function Semester( { semesters, semesterAdded } ) {
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

    const semesterListUi = semesters.map( semester => <li key = {semester.id}
    ><SemesterCard key = { semester.id } semester = { semester } /></li>)

    function periodOptionsUi() {
        return [ 
            <option key = 'spring' value = 'spring' >spring</option>,
            <option key = 'summer' value = 'summer' >summer</option>,
            <option key = 'fall' value = 'fall' >fall</option>
        ]
    }

    return (
        <div>
            <form onSubmit = { handleSubmit }>
                <label>
                    Year:
                    <input type = { 'number' } name = 'year' value = { formData.year } onChange = { handleChange } />
                </label>
                <label>
                    Period:
                    <select name = 'period' value = { formData.period } onChange = { handleChange }>
                    { periodOptionsUi() }
                    </select>
                </label>
                <button type = { 'submit' }>Add Semester</button>
            </form>
            <h3>School's semesters:</h3>
            <ul> { semesterListUi } </ul>
        </div>
    )
}

export default Semester;