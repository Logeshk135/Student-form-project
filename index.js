 const form = document.getElementById("studentForm");
        const tableBody = document.querySelector("#studentTable tbody");

        let students = [];
        let editingIndex = -1;

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const age = document.getElementById("age").value;
            const gender = document.querySelector("input[name='gender']:checked")?.value;
            const course = document.getElementById("course").value;
            const email = document.getElementById("email").value;
            const student = { name, age, gender, course, email };

            if (editingIndex === -1) {
                students.push(student);
            } else {
                students[editingIndex] = student;
                editingIndex = -1;
            }

            form.reset();
            renderTable();
        });

        function renderTable() {
            tableBody.innerHTML = "";
            students.forEach((student, index) => {
                const row = `<tr>
          <td>${student.name}</td>
          <td>${student.age}</td>
          <td>${student.gender}</td>
          <td>${student.course}</td>
          <td>${student.email}</td>
          <td>
           <button onclick="deleteStudent(${index})" style="background-color: red; color: white;">Delete</button>
          </td>
        </tr>`;
                tableBody.innerHTML += row;
            });
        }

        function editStudent(index) {
            const student = students[index];
            document.getElementById("name").value = student.name;
            document.getElementById("age").value = student.age;
            document.querySelector(`input[name='gender'][value="${student.gender}"]`).checked = true;
            document.getElementById("course").value = student.course;
            document.getElementById("email").value = student.email;
            editingIndex = index;
        }

        function deleteStudent(index) {
            if (confirm("Are you sure you want to delete this student?")) {
                students.splice(index, 1);
                renderTable();
            }
        }