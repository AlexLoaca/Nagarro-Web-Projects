import * as vendor from "./vendor.js";

// Array to keep courses
const listOfCourses = [];
let listOfStudents = [];

// Modal backdrop
const backdrop = document.getElementById("backdrop");
// Modal query for Course
const addCourseModal = document.getElementById("add-modal-course");
const startNewCourseButton = document.getElementById("newCourse");
const cancelAddCourseButton = addCourseModal.querySelector(".btn--passive");
const confirmAddCourseButton = cancelAddCourseButton.nextElementSibling;
const inputsOfNewCourse = addCourseModal.querySelectorAll("input");
// Modal query for Student
const addStudentModal = document.getElementById("add-modal-student");
const startNewStudentButton = document.getElementById("newStudent");
const cancelAddStudentButton = addStudentModal.querySelector(".btn--passive");
const confirmAddStudentButton = cancelAddStudentButton.nextElementSibling;
const inputsOfNewStudent = addStudentModal.querySelectorAll("input");
//Elements for rendering
let ul = document.querySelector(".courses-list").firstElementChild;
const dropDownStudentSelect = document.querySelector(".select-students");
const tableSection = document.querySelector(".students-table");
const table = document.getElementById("the-table-of-students");
const unselectedCourseImage = document.querySelector(
  ".no-courses-selected-section"
);
// API links
const studentsApi = "http://localhost:3000/students";
const coursesApi = "http://localhost:3000/courses";
// Selected course from navigation
let currentCourse;

// API Methods / HTTP Requests
const fetchCoursesAndStudents = () => {
  return axios.all([axios.get(coursesApi), axios.get(studentsApi)]);
};
const postNewCourse = (newCourse) => {
  return axios.post(coursesApi, newCourse);
};
const postNewStudent = (newStudent) => {
  return axios.post(studentsApi, newStudent);
};
const fetchStudents = () => {
  return axios.get(studentsApi);
};

const updateStudentAndCourse = (studentId, student, courseId, course) => {
  return axios.all([
    axios.put(studentsApi + "/" + studentId, student),
    axios.put(coursesApi + "/" + courseId, course),
  ]);
};

// Modals
const backdropClickHandler = () => {
  toggleBackdrop();
  closeCourseModal();
  closeStudentModal();
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const clearInputs = (userInputs) => {
  for (const input of userInputs) {
    if (!(input.type === "radio")) {
      input.value = "";
    }
  }
};

// Course Modal
const showCourseModal = () => {
  addCourseModal.classList.add("visible");
  toggleBackdrop();
};

const closeCourseModal = () => {
  addCourseModal.classList.remove("visible");
};

const cancelAddCourseHandler = () => {
  closeCourseModal();
  clearInputs(inputsOfNewCourse);
  toggleBackdrop();
};

// Student Modal
const showStudentModal = () => {
  addStudentModal.classList.add("visible");
  toggleBackdrop();
};

const closeStudentModal = () => {
  addStudentModal.classList.remove("visible");
};

const cancelcreateStudentHandler = () => {
  closeStudentModal();
  clearInputs(inputsOfNewStudent);
  toggleBackdrop();
};
// End of Modals

const updateListOfStudents = async () => {
  try {
    const response = await fetchStudents();
    // const response = await axios.get(studentsApi);
    listOfStudents = response.data;
    return console.log(response, listOfStudents);
  } catch (error) {
    console.error(error);
  }
};

const updateUi = async () => {
  if (!currentCourse) {
    tableSection.classList.add("hidden");
  }
  await fetchCoursesAndStudents()
    .then(
      axios.spread((courses, students) => {
        ul.innerHTML = "";
        for (const course of courses.data) {
          Object.setPrototypeOf(course, vendor.Course.prototype);
          addCourseIntoNav(course);
        }
        listOfStudents = students.data;
        updateStudentsDropdown(currentCourse);
      })
    )
    .catch((err) => console.log(err));
};

const addCourseIntoNav = (course) => {
  listOfCourses.push(course);

  const newLi = document.createElement("li");
  newLi.textContent = course.name;
  newLi.addEventListener("click", () => {
    changeCourseHandler(course);
    ul.childNodes.forEach((li) => li.classList?.remove("selected"));
    newLi.classList.add("selected");
  });

  ul.appendChild(newLi);
};

const addCourseHandler = async () => {
  const courseName = inputsOfNewCourse[0].value.trim();
  const assignedTeacher = inputsOfNewCourse[1].value.trim();
  let newCourse;

  try {
    newCourse = new vendor.Course(courseName, assignedTeacher);

    await postNewCourse(newCourse);
    // await axios.post(coursesApi, newCourse);
    await updateUi();
    console.log(ul.lastElementChild);
    ul.lastElementChild.click();
    // const tbody = table.querySelector("tbody");
    // tbody.innerHTML = "";
  } catch (error) {
    const showError = document.getElementById("show-error-course");
    const wrapperError = showError.closest(".errors-wrapper");
    showError.textContent = `${error}`;
    wrapperError.classList.add("visible");
    setTimeout(() => {
      wrapperError.classList.remove("visible");
    }, 4000);

    return console.error(error);
  }

  cancelAddCourseHandler();
};

const changeCourseHandler = (navSelectedCourse) => {
  currentCourse = navSelectedCourse;
  if (currentCourse) {
    unselectedCourseImage.classList.add("hidden");
    tableSection.classList.remove("hidden");
  }
  updateStudentsTable(navSelectedCourse);
  updateStudentsDropdown(navSelectedCourse);
};

const updateStudentsTable = (navSelectedCourse) => {
  const assignedTeacher = document.querySelector(".assigned-teacher h3");
  assignedTeacher.textContent = navSelectedCourse.assignedTeacher;

  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  for (const student of navSelectedCourse.studentList) {
    let hobbies = student.hobbies
      ? student.hobbies.replace(/[, ]+/g, " ").trim().split(" ")
      : null;

    const row = tbody.insertRow(tbody.rows.length);
    const idCell = row.insertCell(0);
    const firstNameCell = row.insertCell(1);
    const lastNameCell = row.insertCell(2);
    const genderCell = row.insertCell(3);
    const addressCell = row.insertCell(4);
    const hobbiesCell = row.insertCell(5);
    const actions = row.insertCell(6);
    const deleteIcon = document.createElement("I");
    deleteIcon.classList = "fas fa-user-slash";

    idCell.innerHTML = student.id;
    firstNameCell.innerHTML = student.firstName;
    lastNameCell.innerHTML = student.lastName;
    genderCell.innerHTML = student.gender;
    addressCell.innerHTML = student.address;
    hobbiesCell.innerHTML = hobbies;
    actions.appendChild(deleteIcon);

    deleteIcon.addEventListener("click", () =>
      removeStudentHandler(student.id)
    );
  }
};

const updateStudentsDropdown = async (navSelectedCourse) => {
  await updateListOfStudents();
  const unassignedStudents = navSelectedCourse
    ? listOfStudents.filter(
        (student) => !student.courses.includes(navSelectedCourse.name)
      )
    : listOfStudents;

  dropDownStudentSelect.innerHTML = `<option value="" selected hidden class="selected-default">Add to the course</option>`;

  unassignedStudents.forEach((student) => {
    const newOption = document.createElement("option");
    newOption.value = student.id;
    newOption.text = `${student.firstName} ${student.lastName}`;

    dropDownStudentSelect.add(newOption);
  });
};

function selectValueHasChanged() {
  let student;
  for (const wantedStudent of listOfStudents) {
    if (wantedStudent.id == dropDownStudentSelect.value) {
      student = wantedStudent;
    }
  }
  if (currentCourse) {
    currentCourse.addStudent(student);
    // axios
    //   .all([
    //     axios.put(studentsApi + "/" + student.id, student),
    //     axios.put(coursesApi + "/" + currentCourse.id, currentCourse),
    //   ])
    updateStudentAndCourse(student.id, student, currentCourse.id, currentCourse)
      .then(() => {
        updateStudentsTable(currentCourse);
        updateStudentsDropdown(currentCourse);
      })
      .catch((err) => console.log(err));
  }
}

const createStudentHandler = () => {
  const firstName = inputsOfNewStudent[0].value.trim();
  const lastName = inputsOfNewStudent[1].value.trim();
  const gender =
    !inputsOfNewStudent[2].checked && !inputsOfNewStudent[3].checked
      ? null
      : inputsOfNewStudent[2].checked
      ? inputsOfNewStudent[2].value.trim()
      : inputsOfNewStudent[3].value.trim();
  const address = inputsOfNewStudent[4].value.trim()
    ? inputsOfNewStudent[4].value.trim()
    : null;
  const hobbies = inputsOfNewStudent[5].value.trim()
    ? inputsOfNewStudent[5].value.trim()
    : null;
  let newStudent;

  try {
    newStudent = new vendor.Student(
      firstName,
      lastName,
      gender,
      address,
      hobbies
    );
  } catch (error) {
    const showError = document.getElementById("show-error");
    const wrapperError = showError.closest(".errors-wrapper");
    showError.textContent = `${error}`;
    wrapperError.classList.add("visible");
    setTimeout(() => {
      wrapperError.classList.remove("visible");
    }, 4000);

    return console.error(error);
  }

  // axios
  //   .post(studentsApi, newStudent)
  postNewStudent(newStudent)
    .then(() => {
      cancelcreateStudentHandler();
      updateStudentsDropdown(currentCourse);
    })
    .catch((err) => {
      const showError = document.getElementById("show-error");
      const wrapperError = showError.closest(".errors-wrapper");
      showError.innerHTML =
        "Insert failed, duplicate id.<br>Connexion failed. API issues.";
      wrapperError.classList.add("visible");
      setTimeout(() => {
        wrapperError.classList.remove("visible");
      }, 4000);

      return;
    });
};

const removeStudentHandler = (studentId) => {
  console.log("remnove student: ", studentId);
  if (
    confirm(
      `Are you sure you want to remove student ${studentId} from course ${currentCourse.name}?`
    )
  ) {
    const updatedStudent = listOfStudents.find((el) => el.id === studentId);
    const [course, student] = currentCourse.deleteStudent(updatedStudent);
    // axios
    //   .all([
    //     axios.put(studentsApi + "/" + student.id, student),
    //     axios.put(coursesApi + "/" + course.id, course),
    //   ])
    updateStudentAndCourse(student.id, student, course.id, course).then(() => {
      updateStudentsTable(currentCourse);
      updateStudentsDropdown(currentCourse);
    });
  } else {
    console.log("you changed your mind");
  }
};

// Modal Event - Backdrop
backdrop.addEventListener("click", backdropClickHandler);
// Modal Events - Course
startNewCourseButton.addEventListener("click", showCourseModal);
cancelAddCourseButton.addEventListener("click", cancelAddCourseHandler);
confirmAddCourseButton.addEventListener("click", addCourseHandler);
// Modal Events - Student
startNewStudentButton.addEventListener("click", showStudentModal);
cancelAddStudentButton.addEventListener("click", cancelcreateStudentHandler);
confirmAddStudentButton.addEventListener("click", createStudentHandler);
// Render Elements Events
dropDownStudentSelect.addEventListener("change", selectValueHasChanged);
window.onload = updateUi;
