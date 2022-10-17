function SemesterCard( { semester } ) {

    return (
        <div>
            <h4> { semester.year } </h4>
            <p style = { { 'fontStyle': 'italic' } } > { semester.period } </p>
        </div>
    )
}

export default SemesterCard;