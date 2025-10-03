const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Middleware untuk mem-parsing body JSON

// Data siswa tiruan
let students = [
  { id: 1, name: 'Budi', status: 'Lulus' },
  { id: 2, name: 'Siti', status: 'Lulus' },
  { id: 3, name: 'Joko', status: 'Tidak Lulus' },
  { id: 4, name: 'Ani', status: 'Lulus' },
];

// Endpoint untuk mendapatkan data siswa
app.get('/api/students', (req, res) => {
  res.json(students);
});

// Endpoint untuk mengubah status siswa
app.post('/api/students/:id/toggle', (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find(s => s.id === studentId);

  if (student) {
    // Ubah status
    student.status = student.status === 'Lulus' ? 'Tidak Lulus' : 'Lulus';
    res.json(student);
  } else {
    res.status(404).json({ message: 'Siswa tidak ditemukan' });
  }
});

app.listen(port, () => {
  console.log(`Server backend berjalan di http://localhost:${port}`);
});