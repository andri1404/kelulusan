document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#students-table tbody');
  const apiUrl = 'http://localhost:3000/api/students';

  // Fungsi untuk mengambil dan menampilkan siswa
  const fetchAndDisplayStudents = () => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(students => {
        tableBody.innerHTML = ''; // Kosongkan tabel
        students.forEach(student => {
          const row = document.createElement('tr');

          // Sel Nama
          const nameCell = document.createElement('td');
          nameCell.textContent = student.name;
          row.appendChild(nameCell);

          // Sel Status
          const statusCell = document.createElement('td');
          statusCell.textContent = student.status;
          statusCell.className = student.status === 'Lulus' ? 'lulus' : 'tidak-lulus';
          row.appendChild(statusCell);

          // Sel Tindakan dengan tombol
          const actionCell = document.createElement('td');
          const toggleButton = document.createElement('button');
          toggleButton.textContent = 'Ubah Status';
          toggleButton.addEventListener('click', () => toggleStudentStatus(student.id));
          actionCell.appendChild(toggleButton);
          row.appendChild(actionCell);

          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        tableBody.innerHTML = `<tr><td colspan="3">Gagal memuat data. Pastikan server backend berjalan.</td></tr>`;
      });
  };

  // Fungsi untuk mengubah status siswa
  const toggleStudentStatus = (studentId) => {
    fetch(`${apiUrl}/${studentId}/toggle`, { method: 'POST' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Gagal mengubah status');
        }
        return response.json();
      })
      .then(() => {
        // Muat ulang data untuk menampilkan perubahan
        fetchAndDisplayStudents();
      })
      .catch(error => {
        console.error('Error toggling status:', error);
        alert('Gagal mengubah status siswa.');
      });
  };

  // Panggil fungsi untuk pertama kali
  fetchAndDisplayStudents();
});