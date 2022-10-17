function Home( { user, error } ) {
    const userMessage = user==null ? "Please log in." : `Welcome, ${ user.first_name }.`;
    return (
        <div>
            <p> { error } </p>
            <p> { userMessage } </p>
        </div>
    )
}

export default Home;