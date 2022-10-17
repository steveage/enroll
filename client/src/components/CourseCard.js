function CourseCard( { course } ) {
    const studentListUi = course.students.map( student => <li key = { student.id } >
        <h4> { student.first_name } { student.last_name }</h4>
        <p style = { { 'fontStyle': 'italic' } } > { student.email } </p>
    </li>)

    return (
        <div>
            <h3>{ course.name }</h3>
            <p>{ course.code } - {course.section }</p>
            <p>{ course.semester.year } { course.semester.period }</p>
            <p>{ course.teacher.first_name } { course.teacher.last_name }</p>
            <ul> { studentListUi } </ul>
        </div>
    )
}

export default CourseCard;