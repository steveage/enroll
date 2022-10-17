function TeacherCard( { teacher } ) {
    const courseListUi = teacher.courses.map( course => <li key = { course.id }>
        <h4> { course.name } </h4>
        <p> { course.code } - { course.section } </p>
        <p> { course.semester.year } { course.semester.period }</p>
    </li>  )

    return (
        <div>
            <h4>{ `${ teacher.first_name } ${ teacher.last_name }`} </h4>
            <p style = { { 'fontStyle': 'italic' } } > { teacher.email } </p>
            <ul> { courseListUi } </ul>
        </div>
    )
}

export default TeacherCard;