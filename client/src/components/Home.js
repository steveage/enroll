import { useContext } from 'react';
import { HomeContext } from './App';
import { BarChart , Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function Home( { user, courses, handleLogout } ) {
    const homeErrors = useContext( HomeContext );
    const userMessage = user==null ? "Please log in." : `Welcome, ${ user.first_name }.`;

    const errorListUi = homeErrors?.map( error => <p key = { error } >{ error }</p>);

    const courseList = courses.map( course => ({ code: course.code, students: course.students.length } ) );

    const chart = (
        <BarChart width = { 730 } height = { 250 }  data = { courseList } layout = 'horizontal' >
            <XAxis dataKey= 'code' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey = 'students' />
        </BarChart>
    )

    return (
        <div>
            <div> { errorListUi } </div>
            <p> { userMessage } </p>
            <button onClick = { handleLogout }>Logout</button>
            {chart}
        </div>
    )
}

export default Home;