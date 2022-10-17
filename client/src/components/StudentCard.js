function StudentCard( { student } ) {
    const courseListUi = student.student_courses.map( course => <li key = { course.id } >
        <h4> { course.name } </h4>
        <p> { course.code } - { course.section } </p>
        <p> { course.semester.year } { course.semester.period }</p>
        <p> { course.teacher.first_name } {course.teacher.last_name }</p>
    </li> )

    return (
        <div>
            <h4>{ `${ student.first_name } ${ student.last_name }`} </h4>
            <p style = { { 'fontStyle': 'italic' } } > { student.email } </p>
            <ul> { courseListUi } </ul>
        </div>
    )
}

export default StudentCard;