import NavBar from "./NavBar";
import Student from "./Student";
import Teacher from "./Teacher";
import Login from "./Login";
import Course from "./Course";
import Enrollment from "./Enrollment";
import Semester from "./Semester";
import Home from "./Home";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  let navigate = useNavigate();

  const [ semesters, setSemesters ] = useState([]);
  const [ students, setStudents ] = useState([]);
  const [ teachers , setTeachers ] = useState([]);
  const [ courses, setCourses ] = useState([]);
  const [ enrollments, setEnrollments ]  = useState([]);
  const [ user, setUser ] = useState( null );
  const [ errors, setErrors ] = useState( [] );

  const semestersUrl = '/semesters';
  const studentsUrl = '/students';
  const teachersUrl = '/teachers';
  const coursesUrl = '/courses';
  const enrollmentsUrl = '/enrollments';
  const loginUrl = '/login';
  const logoutUrl = '/logout';
  const sessionUrl = '/me';


  useEffect( fetchSemesters, [user] );
  useEffect( fetchStudents, [user] );
  useEffect( fetchTeachers, [user] );
  useEffect( fetchCourses, [user] );
  useEffect( fetchEnrollments, [user] );
  useEffect( fetchUser, [] );

  function fetchSemesters() {
    fetchData( semestersUrl, setSemesters, [] );
  }

  function fetchStudents() {
    fetchData( studentsUrl, setStudents, [] );
  }

  function fetchTeachers() {
    fetchData( teachersUrl, setTeachers, [] );
  }

  function fetchCourses() {
    fetchData( coursesUrl, setCourses, [] );
  }

  function fetchEnrollments() {
    fetchData( enrollmentsUrl, setEnrollments, [] );
  }
  
  function fetchUser() {
    fetchData( sessionUrl, setUser, null );
  }

  async function fetchData( url, setDataFunction, emptyData ) {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setDataFunction( data );
      setErrors( [] );
    } else {
      const error = response.error;
      setErrors( error );
      setDataFunction( emptyData );
    }
  }

  async function onSemesterAdded(semester) {
    await updateDataset ( "POST", semestersUrl, semester, semesters, setSemesters );
  }

  async function onStudentAdded( student ) {
    await updateDataset ( "POST", studentsUrl, student, students, setStudents );
  }

  async function onTeacherAdded( teacher ) {
    await updateDataset ( "POST", teachersUrl, teacher, teachers, setTeachers );
  }

  async function onCourseAdded( course ) {
    await updateDataset ( "POST", coursesUrl, course, courses, setCourses );
  }

  async function onEnrollmentAdded( enrollment ) {
    await updateDataset ( "POST", enrollmentsUrl, enrollment, enrollments, setEnrollments );
  }

  async function onCredentialsCreated( credentials ) {
    const response = await updateData( "POST", loginUrl, credentials );
    const data = await response.json();
    if ( response.ok ) {
      setUser( data );
      setErrors( [] );
      navigate( "/", { user: user, errors: errors, handleLogout: handleLogout } );
    } else {
      setUser( null );
      setErrors( data.errors );
    }
  }

  async function handleEnrollmentDelete( enrollmentToDelete ) {
    const deleteUrl = `${enrollmentsUrl}/${enrollmentToDelete.id}`;
    const settings = { method: "DELETE" };
    const response = await fetch(deleteUrl, settings )

    if ( response.ok ) {
      const updatedEnrollments = enrollments.filter( enrollment => enrollment.id !== enrollmentToDelete.id );
      setEnrollments( updatedEnrollments );
      setErrors( [] );
    } else {
      const data = await response.json();
      setErrors( data.errors );
    }
  }

  async function handleEnrollmentUpdate( enrollment ) {
    const updateUrl = `${enrollmentsUrl}/${enrollment.id}`;
    const data = { score: enrollment.score };
    await updateDataset( "PATCH", updateUrl, data, enrollments, setEnrollments );
  }

  async function updateDataset(action, url, data, dataSet, setDataFunction) {
    const response = await updateData(action, url, data);
    const responseData = await response.json();
    if (response.ok) {
      setDataFunction( [ ...dataSet, responseData ] );
      setErrors( [] );
    } else {
      setErrors(responseData.errors);
    }
  }

  async function updateData(action, url, data) {
    const stringData = JSON.stringify(data);
    const settings = {
      method: action,
      headers: { "Content-Type": "application/json" },
      body: stringData
    }

    return await fetch( url, settings );
  }

  async function handleLogout() {
    const settings = {
      method: "DELETE"
    }

    const response = await fetch( logoutUrl, settings );
    if ( response.ok ) {
      setUser( null );
      setErrors( [] );
    } else {
      const data = await response.json();
      setErrors( data.errors );
    }
  }

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element = { <Home user = { user } errors = { errors } handleLogout = { handleLogout } /> }/>
        <Route path='/login' element = { <Login credentialsCreated = { onCredentialsCreated } errors = { errors } /> }/>
        <Route path='/enrollment' element = { <Enrollment enrollments = { enrollments } students = { students } courses = { courses } enrollmentAdded = { onEnrollmentAdded } deleteEnrollment = { handleEnrollmentDelete } updateEnrollment = { handleEnrollmentUpdate } errors = { errors } /> }/>
        <Route path='/semester' element = { <Semester semesters = { semesters } semesterAdded = { onSemesterAdded } errors = { errors } /> }/>
        <Route path='/teacher' element = { <Teacher teachers = { teachers } teacherAdded = { onTeacherAdded } errors = { errors } /> }/>
        <Route path='/student' element = { <Student students = { students } studentAdded = { onStudentAdded } errors = { errors } /> }/>
        <Route path='/course' element = { <Course courses = { courses } semesters = { semesters } teachers = { teachers } courseAdded = { onCourseAdded } errors = { errors }/> }/>
        <Route path='*' element = { <div>Not Found!</div> }/>
      </Routes>
    </div>
  );
}

export default App;