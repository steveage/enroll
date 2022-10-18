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
  const [ loginErrorMessage, setLoginErrorMessage ] = useState('');

  const semestersUrl = '/semesters';
  const studentsUrl = '/students';
  const teachersUrl = '/teachers';
  const coursesUrl = '/courses';
  const enrollmentsUrl = '/enrollments';
  const logoutUrl = '/logout';
  const sessionUrl = '/me';


  useEffect( fetchSemesters, [] );
  useEffect( fetchStudents, [] );
  useEffect( fetchTeachers, [] );
  useEffect( fetchCourses, [] );
  useEffect( fetchEnrollments, []);
  useEffect( fetchUser, [] );

  function fetchSemesters() {
    fetchData( semestersUrl, setSemesters );
  }

  function fetchStudents() {
    fetchData( studentsUrl, setStudents );
  }

  function fetchTeachers() {
    fetchData( teachersUrl, setTeachers );
  }

  function fetchCourses() {
    fetchData( coursesUrl, setCourses );
  }

  function fetchEnrollments() {
    fetchData( enrollmentsUrl, setEnrollments );
  }
  
  function fetchUser() {
    fetchData( sessionUrl, setUser );
  }

  async function fetchData(url, setDataFunction) {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setDataFunction(data);
    } else {
      const error = response.error;
      setLoginErrorMessage(error);
    }
  }

  function onSemesterAdded(semester) {
    updateDataset ( "POST", semestersUrl, semester, semesters, setSemesters );
  }

  function onStudentAdded( student ) {
    updateDataset ( "POST", studentsUrl, student, students, setStudents );
  }

  function onTeacherAdded( teacher ) {
    updateDataset ( "POST", teachersUrl, teacher, teachers, setTeachers );
  }

  function onCourseAdded( course ) {
    updateDataset ( "POST", coursesUrl, course, courses, setCourses );
  }

  function onEnrollmentAdded( enrollment ) {
    updateDataset ( "POST",enrollmentsUrl, enrollment, enrollments, setEnrollments );
  }

  async function onCredentialsCreated( user ) {
    if ( user ) {
      setUser( user );
      navigate( "/", { user: user, error: loginErrorMessage, handleLogout: handleLogout } );
    }
  }

  function handleEnrollmentDelete( enrollmentToDelete ) {
    const deleteUrl = `${enrollmentsUrl}/${enrollmentToDelete.id}`;
    fetch(deleteUrl, { method: "DELETE" })
      .then( response => response.json() )

    const updatedEnrollments = enrollments.filter( enrollment => enrollment.id !== enrollmentToDelete.id );
    setEnrollments( updatedEnrollments );
  }

  function handleEnrollmentUpdate( enrollment ) {
    const updateUrl = `${enrollmentsUrl}/${enrollment.id}`;
    const data = { score: enrollment.score };
    updateDataset( "PATCH", updateUrl, data, enrollments, setEnrollments );
  }

  async function updateDataset(action, url, data, dataSet, setDataFunction) {
    const response = await updateData(action, url, data);
    if (response.ok) {
      const data = await response.json();
      setDataFunction( [ ...dataSet, data ] );
    } else {
      const data = await response.json();
      setLoginErrorMessage(data.error);
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

    await fetch( logoutUrl, settings );
    setUser(null);
  }

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element = { <Home user = { user } error = { loginErrorMessage } handleLogout = { handleLogout } /> }/>
        <Route path='/login' element = { <Login credentialsCreated = { onCredentialsCreated } /> }/>
        <Route path='/enrollment' element = { <Enrollment enrollments = { enrollments } students = { students } courses = { courses } enrollmentAdded = { onEnrollmentAdded } deleteEnrollment = { handleEnrollmentDelete } updateEnrollment = { handleEnrollmentUpdate }/> }/>
        <Route path='/semester' element = { <Semester semesters = { semesters } semesterAdded = { onSemesterAdded } /> }/>
        <Route path='/teacher' element = { <Teacher teachers = { teachers } teacherAdded = { onTeacherAdded } /> }/>
        <Route path='/student' element = { <Student students = { students } studentAdded = { onStudentAdded } /> }/>
        <Route path='/course' element = { <Course courses = { courses } semesters = { semesters } teachers = { teachers } courseAdded = { onCourseAdded } /> }/>
        <Route path='*' element = { <div>Not Found!</div> }/>
      </Routes>
    </div>
  );
}

export default App;