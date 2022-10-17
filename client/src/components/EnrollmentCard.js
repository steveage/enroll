import { useState } from 'react';

function EnrollmentCard( { enrollment, deleteEnrollment, updateEnrollment } ) { 
    const [ score, setScore ] = useState( enrollment.score );

    function handleChange ( event ) {
        setScore( event.target.value )
    }

    function handleSubmit() {
        enrollment.score = score;
        updateEnrollment( enrollment );
    }

    return (
        <div>
            <h3> { enrollment.user.first_name } { enrollment.user.last_name } </h3>
            <h4> { enrollment.course.code } - { enrollment.course.section }: { enrollment.course.name } </h4>
            <form onSubmit = { handleSubmit }>
                <label>
                    Score:
                    <input type = { 'text' } name = 'score' value = { score } onChange = { handleChange } />
                </label>
                <button type = { 'submit' }>Update</button>
            </form>
            <button onClick = { () => deleteEnrollment( enrollment ) }>Delete</button>
        </div>
    )
}

export default EnrollmentCard;