const coursesIds = [];
const studentIds = [];

// Course class
function Course(id, name, assignedTeacher, studentList) {
  try {
    if (arguments.length < 4) throw "Required property is missing";
    if (
      typeof id !== "number" ||
      typeof name !== "string" ||
      typeof assignedTeacher !== "string" ||
      !Array.isArray(studentList)
    )
      throw "Invalid property type";
    if (coursesIds.includes(id)) throw `Course with id ${id} already exists!`;
  } catch (error) {
    return console.error(error);
  }

  coursesIds.push(id);
  console.log("Course was successfully created");

  this.id = id;
  this.name = name;
  this.assignedTeacher = assignedTeacher;
  this.studentList = studentList;
}

Course.prototype.addStudent = function (theStudent) {
  if (typeof theStudent !== "object") {
    return console.error("Invalid property type");
  }
  if (this.studentList.length) {
    // check if the array is empty.
    for (const student of this.studentList) {
      if (student.id === theStudent.id) {
        return console.error("This student is already enrolled at this course");
      }
    }
  }

  theStudent[this.name + "Grade"] = null;
  theStudent.courses.push(this.name);
  this.studentList.push(theStudent);
  console.log(
    `Student with id ${theStudent.id} was successfully added to ${this.name} course`
  );
};

Course.prototype.deleteStudent = function (studentId) {
  const student = this.studentList.find((el) => el.id === studentId);
  if (student) {
    delete student[this.name + "Grade"];
    this.studentList = this.studentList.filter((el) => el.id !== studentId);
    console.log(
      `Student with id ${studentId} was successfully deleted from this ${this.name} course`
    );

    student.courses.splice(student.courses.indexOf(this.name), 1); // Removes from student courses array.

    this.averageGrade();
  } else {
    console.error(
      "Student id is invalid resulting in failing to delete the specified student from this course"
    );
  }
};

Course.prototype.setGrade = function (student, grade) {
  if (arguments.length < 2) {
    return console.error("One of the required properties is missing");
  }
  if (
    this.studentList.find((el) => el === student) &&
    grade >= 1 &&
    grade <= 10
  ) {
    student[this.name + "Grade"] = grade;
    console.log(
      `The student's grade in the ${this.name} course is ${
        student[this.name + "Grade"]
      }`
    );
    this.averageGrade();
  } else {
    console.error("Student and/or grade are invalid!");
  }
};

Course.prototype.averageGrade = function (showLogs = true) {
  const evaluatedStudents = this.studentList.filter(
    (student) => !!student[this.name + "Grade"]
  );
  if (showLogs)
    console.log(
      `For ${this.name} course, we have ${evaluatedStudents.length} students:`
    );
  const sum = evaluatedStudents.reduce((accumulator, currentValue) => {
    if (showLogs)
      console.log(
        `${currentValue.firstName} with ${this.name + "Grade"} = ${
          currentValue[this.name + "Grade"]
        }`
      );
    return accumulator + currentValue[this.name + "Grade"];
  }, 0);
  const average = sum / evaluatedStudents.length;
  if (showLogs)
    console.log(
      `The average grade obtained for ${this.name} course will be ${average}`
    );
  return average;
};

Course.prototype.printStudentList = function () {
  console.log(this.studentList);
};

Course.prototype.sortStudentsByGrade = function () {
  this.studentList = this.studentList.sort((a, b) =>
    a[this.name + "Grade"] - b[this.name + "Grade"] ? 1 : -1
  );
  return console.log(this.studentList);
};

// Student class
function Student(
  id,
  firstName,
  lastName,
  gender,
  address = null,
  hobbies = null
) {
  try {
    if (arguments.length < 4) throw "Required property is missing";
    if (
      typeof id !== "number" ||
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof gender !== "string"
    )
      throw "Invalid property type";
    if (
      (address && typeof address !== "string") ||
      (hobbies && typeof hobbies !== "string")
    )
      throw "Invalid additional property type";
    if (studentIds.includes(id)) throw `Student with id ${id} already exists!`;
  } catch (error) {
    return console.error(error);
  }

  studentIds.push(id);
  console.log("Student was successfully created");

  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = gender;
  this.address = address;
  this.hobbies = hobbies;
  this.courses = [];
}

Student.prototype.enroll = function (...courses) {
  for (const course of courses) {
    course.addStudent(this);
  }
};

Student.prototype.dropCourse = function (course) {
  course.deleteStudent(this.id);
};

// Helper Functions

const getStudentsAboveAverage = function (Course) {
  if (!!Course) {
    const aboveAverageStudents = Course.studentList.filter(
      (student) => student[Course.name + "Grade"] > Course.averageGrade(false)
    );
    return console.log(aboveAverageStudents);
  } else {
    console.error("Please provide an existing course!");
  }
};

const getFavouriteCourse = function (arrayOfStudents) {
  let allCourses = [];
  arrayOfStudents.forEach((student) => {
    allCourses.push(...student.courses);
  });
  let x = 1;
  let y = 0;
  let favouriteCourse;
  for (let i = 0; i < allCourses.length; i++) {
    for (let j = i; j < allCourses.length; j++) {
      if (allCourses[i] === allCourses[j]) {
        y++;
      }
      if (x < y) {
        x = y;
        favouriteCourse = allCourses[i];
      }
    }
    y = 0;
  }
  console.log("All: ", allCourses);
  console.log("Fav: ", favouriteCourse);
};

const getAllStudentsByCourses = function (arrayOfCourses) {
  const allStudents = [];
  const counts = { students: [] };

  //We get all the students in an array
  arrayOfCourses.forEach((course) => {
    allStudents.push(...course.studentList);
  });

  // We count the duplicates and save in the object those that are equal to arrayOfCourses.length. E.g: counts = {1: 2, 3: 2, 4: 7, students [Obj1, Obj2]}
  for (let i = 0; i < allStudents.length; i++) {
    if (counts[allStudents[i].id]) counts[allStudents[i].id] += 1;
    if (!counts[allStudents[i].id]) counts[allStudents[i].id] = 1;
    if (counts[allStudents[i].id] === arrayOfCourses.length)
      counts.students.push(allStudents[i]);
  }

  const { students } = counts; // Extract only: [Obj1, Obj2].

  for (const student of students) {
    console.log(
      `${student.firstName} ${student.lastName}, with id ${student.id}, participates in all the courses given`
    );
  }
};

// ------------------------- Test Area -------------------------------
console.log(
  "%c ---------- Topic 1 ----------",
  "background: #222; color: #bada55"
);

let historyCourse = new Course(1, "history", "Victoria Cobbett", []); //should output 'Course was successfully created'
let frenchCourse = new Course("3", "french", "Josselin Bourseiller", []); //should output 'Invalid property type'
let englishCourse = new Course(2, "english", "Andrea Barrett", []); //should output 'Course was successfully created'

let mathematicsCourse = new Course(2, "mathematics", "Jack  Connor", []); //should output 'Course with id 2 already exists'
let physicsCourse = new Course(10); //should output 'Required property is missing'

let martinStudent = new Student(1, "Martin", "Lawrence", "M"); //should output 'Student was successfully created'
let kellyStudent = new Student(
  "3",
  "Freddy",
  "Kelly",
  "M",
  "3497 James Avenue"
); //should output 'Invalid required property type'
kellyStudent = new Student(2, "Freddy", "Kelly", "M", "3497 James Avenue"); //should output 'Student was successfully created'
let maxStudent = new Student(
  2,
  "Max",
  "Austin",
  "M",
  "4026  Lee Avenue",
  "sports"
); //should output 'Student with id 2 already exists'
maxStudent = new Student(3, "Max", "Austin", "M", "4026  Lee Avenue", "sports"); //should output 'Student was successfully created'
let aliyaCollins = new Student(
  4,
  "Aliya",
  "Collins",
  "F",
  "353  Oliverio Drive",
  19
); //should output 'Invalid additional property type'
aliyaCollins = new Student(
  4,
  "Aliya",
  "Collins",
  "F",
  "353  Oliverio Drive",
  "cooking, reading"
); //should output 'Student was successfully created'
let norahCollins = new Student(5, "Norah"); //should output 'Required property is missing'
let Greta = new Student(6, "Greta ", "Malvinster", "F", "488  Down Drove"); //should output 'Course was successfully created'

console.log(martinStudent.hobbies); //should output null

historyCourse.addStudent(martinStudent); //should output 'Student with id 1 was successfully added to this course'
historyCourse.addStudent(kellyStudent); //should output 'Student with id 2 was successfully added to this course'
englishCourse.addStudent(martinStudent); //should output 'Student with id 1 was successfully added to this course'

historyCourse.printStudentList();
//should output
// [
//   Student {
//     id: 1,
//     firstName: 'Martin',
//     lastName: 'Lawrence',
//     gender: 'M',
//     address: null,
//     hobbies: null
//   },
//   Student {
//     id: 2,
//     firstName: 'Freddy',
//     lastName: 'Kelly',
//     gender: 'M',
//     address: '3497 James Avenue',
//     hobbies: null
//   }
// ]

englishCourse.printStudentList();
//should output
// [
//   Student {
//     id: 1,
//     firstName: 'Martin',
//     lastName: 'Lawrence',
//     gender: 'M',
//     address: null,
//     hobbies: null
//   }
// ]

historyCourse.deleteStudent(101); //should output 'Student id is invalid resulting in failing to delete the specified student from this course'
historyCourse.deleteStudent(1); //should output 'Student with id 1 was successfully deleted from this course'

historyCourse.printStudentList();
//should output
// [
//   Student {
//     id: 2,
//     firstName: 'Freddy',
//     lastName: 'Kelly',
//     gender: 'M',
//     address: '3497 James Avenue',
//     hobbies: null
//   }
// ]
// getAllStudentsByCourses([historyCourse,englishCourse]);

// ------------------ Topic 2 -----------------------------------------
console.log(
  "%c ---------- Topic 2 ----------",
  "background: #222; color: #bada55"
);

historyCourse.setGrade(martinStudent, 8); //Uncaught Student and/or grade are invalid!
englishCourse.setGrade(martinStudent, 8);
// The student's grade in the english course is 8.
// For english course, we have 1 students: Martin with englishGrade = 8
// The average grade obtained for english course will be 8
englishCourse.setGrade(martinStudent); //One of the required properties is missing
Greta.enroll(historyCourse, englishCourse);
// Student with id 6 was successfully added to history course
// Student with id 6 was successfully added to english course
historyCourse.setGrade(kellyStudent, 5);
historyCourse.setGrade(Greta, 6);
historyCourse.averageGrade();
// The average grade obtained for history course will be 5.5
// For history course, we have 2 students:
// Freddy with historyGrade = 5
// Greta  with historyGrade = 6
// The average grade obtained for history course will be 5.5
historyCourse.sortStudentsByGrade(); // Sorted array with students.
kellyStudent.dropCourse(historyCourse);
//.. Student with id 2 was successfully deleted from this history course.
//  The average grade obtained for history course will be 6
historyCourse.addStudent(kellyStudent);
historyCourse.addStudent(martinStudent);
historyCourse.setGrade(kellyStudent, 9);
historyCourse.setGrade(martinStudent, 5);
getStudentsAboveAverage(historyCourse); // Return the students with the course grade bigger than the average course grade
getFavouriteCourse([Greta, kellyStudent]);
// All:  Array(3) [ "history", "english", "history" ]
// Fav:  history

mathematicsCourse = new Course(10, "mathematics", "Melania Franck", []);
let BiologyCourse = new Course(11, "biology", "Josselin Bourseiller", []);
physicsCourse = new Course(12, "physics", "Andrea Barrett", []);
let art = new Course(13, "art", "Agela Brown", []);

var john = new Student(14, "John", "Lawrence", "M");
var michael = new Student(15, "Michael", "Kelly", "M", "3497 James Avenue");
var monica = new Student(16, "Monica", "Collins", "F", "353  Oliverio Drive");
var geo = new Student(17, "Geo ", "Malvinster", "F", "488  Down Drove");
var estera = new Student(18, "Estera ", "Straford", "F", "255 Bubble Gum");

mathematicsCourse.addStudent(john);
mathematicsCourse.addStudent(michael);
mathematicsCourse.addStudent(monica);
mathematicsCourse.addStudent(geo);
mathematicsCourse.addStudent(estera);

BiologyCourse.addStudent(john);
BiologyCourse.addStudent(michael);
BiologyCourse.addStudent(monica);
BiologyCourse.addStudent(geo);

physicsCourse.addStudent(john);
physicsCourse.addStudent(michael);
physicsCourse.addStudent(monica);

art.addStudent(john);
art.addStudent(michael);

getAllStudentsByCourses([mathematicsCourse, BiologyCourse, physicsCourse, art]);
// John Lawrence, with id 14, participates in all the courses given
// Michael Kelly, with id 15, participates in all the courses given
