function Home( { user, errors, handleLogout } ) {
    const userMessage = user==null ? "Please log in." : `Welcome, ${ user.first_name }.`;

    const errorListUi = errors?.map( error => <p key = { error } >{ error }</p>)

    return (
        <div>
            <div> { errorListUi } </div>
            <p> { userMessage } </p>
            <button onClick = { handleLogout }>Logout</button>
        </div>
    )
}

export default Home;