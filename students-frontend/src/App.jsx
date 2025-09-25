import {useEffect, useState} from "react";

function App() {
const [students, setStudents] = useState([]);
const [student, setStudent] = useState(null);
const [courseStudents, setCourseStudents] = useState([]);
const [course, setCourse] = useState("");

useEffect( () => {
  fetch ("http://localhost:5000/students")
  .then (res => res.json())
  .then (data => setStudents (data))
  .catch (err => console.error ("Error fetching students:", err));
}, []);

const getStudentById = (id) => {
  fetch ('http://localhost:5000/students/${id}')
  .then (res => res.json())
  .then (data => setStudent(data))
  .catch (err => console.error("Error fetching student:", err));
};

const filterByCourse = () =>{
  fetch('http://localhost:5000/students/filter?course=$ {course}')
  .then(res => res.json())
  .then(data => setCourseStudents(data))
  .catch(err => console.error("Error filtering students:", err));
  };


 return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Students API (React + Vite Frontend)</h1>

      {/* All Students */}
      <h2>All Students</h2>
      <ul>
        {students.map(s => (
          <li key={s.id}>
            {s.name} ({s.course})
            <button onClick={() => getStudentById(s.id)} style={{ marginLeft: "10px" }}>
              View Details
            </button>
          </li>
        ))}
      </ul>

      {/* Student by ID */}
      {student && (
        <div>
          <h2>Student Details</h2>
          <p><b>ID:</b> {student.id}</p>
          <p><b>Name:</b> {student.name}</p>
          <p><b>Course:</b> {student.course}</p>
        </div>
      )}

      {/* Filter by Course */}
      <h2>Filter Students by Course</h2>
      <input
        type="text"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        placeholder="Enter course (e.g., BSIT)"
      />
      <button onClick={filterByCourse}>Filter</button>

      <ul>
        {courseStudents.map(s => (
          <li key={s.id}>{s.name} ({s.course})</li>
        ))}
      </ul>
    </div>
  ); 
}

export default App;
