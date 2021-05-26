import * as vendor from "./vendor.js";
import * as showAlert from "./toast.js";

// Array to keep courses
const listOfCourses = [];
const listOfStudents = [];

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
const ul = document.querySelector(".courses-list").firstElementChild;
const dropDownStudentSelect = document.querySelector(".select-students");
const tableSection = document.querySelector(".students-table");
const table = document.getElementById("the-table-of-students");
const unselectedCourseImage = document.querySelector(
  ".no-courses-selected-section"
);

let currentCourse;

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

const updateUi = () => {
  if (!currentCourse) {
    tableSection.classList.add("hidden");
  }
};

const addCourseHandler = () => {
  const id = parseInt(inputsOfNewCourse[0].value);
  const courseName = inputsOfNewCourse[1].value;
  const assignedTeacher = inputsOfNewCourse[2].value;
  let newCourse;

  try {
    newCourse = new vendor.Course(id, courseName, assignedTeacher);
    console.log(newCourse);
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

  listOfCourses.push(newCourse);

  showAlert.Toast.show(
    `The ${newCourse.name} course has been created.`,
    "success"
  );

  const newLi = document.createElement("li");
  newLi.textContent = newCourse.name;
  newLi.addEventListener("click", () => {
    changeCourseHandler(newCourse);
    ul.childNodes.forEach((li) => li.classList?.remove("selected"));
    newLi.classList.add("selected");
  });

  ul.appendChild(newLi);

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

const updateStudentsDropdown = (navSelectedCourse) => {
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
    updateStudentsTable(currentCourse);
    updateStudentsDropdown(currentCourse);
    showAlert.Toast.show(
      `${student.lastName} joined the ${currentCourse.name} course.`,
      "success"
    );
  }
}

const createStudentHandler = () => {
  const id = parseInt(inputsOfNewStudent[0].value.trim());
  const firstName = inputsOfNewStudent[1].value.trim();
  const lastName = inputsOfNewStudent[2].value.trim();
  const gender = inputsOfNewStudent[3].checked
    ? inputsOfNewStudent[3].value.trim()
    : inputsOfNewStudent[4].value.trim();
  const address = inputsOfNewStudent[5].value.trim()
    ? inputsOfNewStudent[5].value.trim()
    : null;
  const hobbies = inputsOfNewStudent[6].value.trim()
    ? inputsOfNewStudent[6].value.trim()
    : null;
  let newStudent;

  try {
    newStudent = new vendor.Student(
      id,
      firstName,
      lastName,
      gender,
      address,
      hobbies
    );
    console.log(newStudent);
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

  listOfStudents.push(newStudent);
  cancelcreateStudentHandler();
  updateStudentsDropdown(currentCourse);
  showAlert.Toast.show(
    `Student ${newStudent.lastName} was created.`,
    "success"
  );
};

const removeStudentHandler = (studentId) => {
  console.log("remnove student: ", studentId);
  if (
    confirm(
      `Are you sure you want to remove student ${studentId} from course ${currentCourse.name}?`
    )
  ) {
    const updatedStudent = listOfStudents.find((el) => el.id === studentId);
    currentCourse.deleteStudent(studentId);
    updateStudentsDropdown(currentCourse);
    updateStudentsTable(currentCourse);
    showAlert.Toast.show(
      `${updatedStudent.lastName} no longer attends ${currentCourse.name} classes.`,
      "success"
    );
  } else {
    console.log("you changed your mind");
  }
};

// Modal Event - Backdrop
backdrop.addEventListener("click", backdropClickHandler);
//Modal Events - Course
startNewCourseButton.addEventListener("click", showCourseModal);
cancelAddCourseButton.addEventListener("click", cancelAddCourseHandler);
confirmAddCourseButton.addEventListener("click", addCourseHandler);
//Modal Events - Student
startNewStudentButton.addEventListener("click", showStudentModal);
cancelAddStudentButton.addEventListener("click", cancelcreateStudentHandler);
confirmAddStudentButton.addEventListener("click", createStudentHandler);
// Render Elements
dropDownStudentSelect.addEventListener("change", selectValueHasChanged);
window.onload = () => {
  updateUi();
  showAlert.Toast.init();
};
