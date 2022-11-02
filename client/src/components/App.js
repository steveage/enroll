import NavBar from "./NavBar";
import Student from "./Student";
import Teacher from "./Teacher";
import Login from "./Login";
import Course from "./Course";
import Enrollment from "./Enrollment";
import Semester from "./Semester";
import Home from "./Home";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState, createContext } from 'react';

export const UserContext = createContext();
export const SemesterContext = createContext();
export const StudentContext = createContext();
export const TeacherContext = createContext();
export const CourseContext = createContext();
export const EnrollmentContext = createContext();
export const HomeContext = createContext();

function App() {
  let navigate = useNavigate();

  const [ semesters, setSemesters ] = useState([]);
  const [ students, setStudents ] = useState([]);
  const [ teachers , setTeachers ] = useState([]);
  const [ courses, setCourses ] = useState([]);
  const [ enrollments, setEnrollments ]  = useState([]);
  const [ user, setUser ] = useState( null );
  
  const [ semesterErrors, setSemesterErrors ] = useState( [] );
  const [ studentErrors, setStudentErrors ] = useState( [] );
  const [ teacherErrors, setTeacherErrors ] = useState( [] );
  const [ courseErrors, setCourseErrors ] = useState( [] );
  const [ enrollmentErrors, setEnrollmentErrors ] = useState( [] );
  const [ userErrors, setUserErrors ] = useState( [] );
  const [ homeErrors, setHomeErrors ] = useState( [] );
  
  const semestersUrl = '/semesters';
  const studentsUrl = '/students';
  const teachersUrl = '/teachers';
  const coursesUrl = '/courses';
  const enrollmentsUrl = '/enrollments';
  const loginUrl = '/login';
  const logoutUrl = '/logout';
  const sessionUrl = '/me';
   
  useEffect( fetchSemesters, [  ] );
  useEffect( fetchStudents, [  ] );
  useEffect( fetchTeachers, [  ] );
  useEffect( fetchCourses, [  ] );
  useEffect( fetchEnrollments, [  ] );
  useEffect( fetchUser, [  ] );
  
  function fetchSemesters() {
    fetchData( semestersUrl, setSemesters, [], 'semester' );
  }

  function fetchStudents() {
    fetchData( studentsUrl, setStudents, [], 'student' );
  }

  function fetchTeachers() {
    fetchData( teachersUrl, setTeachers, [], 'teacher' );
  }

  function fetchCourses() {
    fetchData( coursesUrl, setCourses, [], 'course' );
  }

  function fetchEnrollments() {
    fetchData( enrollmentsUrl, setEnrollments, [], 'enrollment' );
  }
  
  function fetchUser() {
    fetchData( sessionUrl, setUser, null, 'user' );
  }
  
  async function fetchData( url, setDataFunction, emptyData, dataType ) {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setDataFunction( data );
      setHomeErrors( [] );
    } else {
      setHomeErrors( [ "Unable to load data from the server." ] );
      setDataFunction( emptyData );
    }
  };

  async function onSemesterAdded(semester) {
    await updateDataset ( "POST", semestersUrl, semester, semesters, setSemesters, setSemesterErrors );
  }

  async function onStudentAdded( student ) {
    await updateDataset ( "POST", studentsUrl, student, students, setStudents, setStudentErrors );
  }

  async function onTeacherAdded( teacher ) {
    await updateDataset ( "POST", teachersUrl, teacher, teachers, setTeachers, setTeacherErrors );
  }

  async function onCourseAdded( course ) {
    await updateDataset ( "POST", coursesUrl, course, courses, setCourses, setCourseErrors );
  }

  async function onEnrollmentAdded( enrollment ) {
    await updateDataset ( "POST", enrollmentsUrl, enrollment, enrollments, setEnrollments, setEnrollmentErrors );
  }

  async function onCredentialsCreated( credentials ) {
    const response = await updateData( "POST", loginUrl, credentials );
    const data = await response.json();
    if ( response.ok ) {
      setUser( data );
      setUserErrors( [] );
      navigate( "/", { user: user, handleLogout: handleLogout } );
    } else {
      setUser( null );
      setUserErrors( data.errors );
    }
  }

  async function handleEnrollmentDelete( enrollmentToDelete ) {
    const deleteUrl = `${enrollmentsUrl}/${enrollmentToDelete.id}`;
    const settings = { method: "DELETE" };
    const response = await fetch(deleteUrl, settings )

    if ( response.ok ) {
      const updatedEnrollments = enrollments.filter( enrollment => enrollment.id !== enrollmentToDelete.id );
      setEnrollments( updatedEnrollments );
      setEnrollmentErrors( [] );
    } else {
      const data = await response.json();
      setEnrollmentErrors( data.errors );
    }
  }

  async function handleEnrollmentUpdate( enrollment ) {
    const updateUrl = `${enrollmentsUrl}/${enrollment.id}`;
    const data = { score: enrollment.score };
    await updateDataset( "PATCH", updateUrl, data, enrollments, setEnrollments, setEnrollmentErrors );
  }

  async function updateDataset(action, url, data, dataSet, setDataFunction, setErrorFunction ) {
    const response = await updateData(action, url, data);
    const responseData = await response.json();
    if (response.ok) {
      setDataFunction( [ ...dataSet, responseData ] );
      setErrorFunction( [] );
    } else {
      setErrorFunction( responseData.errors );
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
      setHomeErrors( [] );
    } else {
      const data = await response.json();
      setHomeErrors( data.errors );
    }
  }

  return (
    <div>
      <NavBar user = { user }/>
      <Routes>
        <Route path='/' element = {
          <HomeContext.Provider value = { homeErrors }>
            <Home user = { user } courses = { courses } handleLogout = { handleLogout } /> 
          </HomeContext.Provider> } />
        <Route path='/login' element = {
          <UserContext.Provider value = { userErrors }>
            <Login credentialsCreated = { onCredentialsCreated } />
          </UserContext.Provider> } />
        <Route path='/enrollment' element = {
           <EnrollmentContext.Provider value = { enrollmentErrors }>
             <Enrollment enrollments = { enrollments } students = { students } courses = { courses } enrollmentAdded = { onEnrollmentAdded } deleteEnrollment = { handleEnrollmentDelete } updateEnrollment = { handleEnrollmentUpdate } />
           </EnrollmentContext.Provider> } />
        <Route path='/semester' element = {
          <SemesterContext.Provider value = { semesterErrors }>
            <Semester semesters = { semesters } semesterAdded = { onSemesterAdded }/>
          </SemesterContext.Provider> } />
        <Route path='/teacher' element = {
           <TeacherContext.Provider value = { teacherErrors }>
             <Teacher teachers = { teachers } teacherAdded = { onTeacherAdded } /> 
           </TeacherContext.Provider> } />
        <Route path='/student' element = {
          <StudentContext.Provider value = { studentErrors } >
            <Student students = { students } studentAdded = { onStudentAdded } />
          </StudentContext.Provider> } />
        <Route path='/course' element = {
          <CourseContext.Provider value = { courseErrors } >
            <Course courses = { courses } semesters = { semesters } teachers = { teachers } courseAdded = { onCourseAdded } />
          </CourseContext.Provider> } />
        <Route path='*' element = { <div>Not Found!</div> }/>
      </Routes>
    </div>
  );
}

export default App;