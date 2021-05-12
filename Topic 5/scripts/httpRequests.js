// API links
const studentsApi = "http://localhost:3000/students";
const coursesApi = "http://localhost:3000/courses";

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

export {
  studentsApi,
  coursesApi,
  fetchCoursesAndStudents,
  postNewCourse,
  postNewStudent,
  fetchStudents,
  updateStudentAndCourse,
};
