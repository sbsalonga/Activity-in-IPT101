const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// ✅ Allow cross-origin (for React, Vue, Angular frontends)
app.use(cors());

// Mock data
const students = [
  { id: 1, name: "Juan", course: "BSIT" },
  { id: 2, name: "Maria", course: "BSCpE" },
  { id: 3, name: "Liza", course: "BSCS" }
];

// ✅ GET all students
app.get("/students", (req, res) => {
  res.json(students);
});

// ✅ GET student by ID
app.get("/students/:id", (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  student ? res.json(student) : res.status(404).json({ error: "Student not found" });
});

// ✅ GET students by course filter
app.get("/students/filter", (req, res) => {
  const { course } = req.query;
  if (course) {
    const filtered = students.filter(s => s.course.toLowerCase() === course.toLowerCase());
    return res.json(filtered);
  }
  res.json(students);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
