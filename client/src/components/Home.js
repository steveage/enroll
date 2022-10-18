function Home( { user, error, handleLogout } ) {
    const userMessage = user==null ? "Please log in." : `Welcome, ${ user.first_name }.`;
    return (
        <div>
            <p> { error } </p>
            <p> { userMessage } </p>
            <button onClick = { handleLogout }>Logout</button>
        </div>
    )
}

export default Home;