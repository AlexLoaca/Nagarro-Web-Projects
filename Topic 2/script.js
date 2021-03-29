let coursesIds = [];
let studentIds = [];

// Course class
function Course(id, name, assignedTeacher, studentList) {
  if (arguments.length < 4) {
    throw("Required property is missing");
  } else if (
    typeof id !== "number" ||
    typeof name !== "string" ||
    typeof assignedTeacher !== "string" ||
    !Array.isArray(studentList)
  ) {
    throw("Invalid property type");
  } else if (coursesIds.includes(id)) {
    throw(`Course with id ${id} already exists!`);
  } else {
    coursesIds.push(id);
    console.log("Course was successfully created");
  }

  this.id = id;
  this.name = name;
  this.assignedTeacher = assignedTeacher;
  this.studentList = studentList;
}

Course.prototype.addStudent = function(Studentul) {
  this.studentList.push(Studentul);
  console.log(`Student with id ${Studentul.id} was successfully added to this course`);
}

Course.prototype.deleteStudent = function(studentId) {
  if (this.studentList.find(el => el.id === studentId)) {
    this.studentList = this.studentList.filter(el => el.id !== studentId);
    studentIds.splice(studentIds.indexOf(studentId), 1);
    console.log(`Student with id ${studentId} was successfully deleted from this course`);
  } else {
    console.error('Student id is invalid resulting in failing to delete the specified student from this course');
  }
}

Course.prototype.printStudentList = function() {
  console.log(this.studentList);
}


// Student class
function Student(id, firstName, lastName, gender, address = null, hobbies = null) {
  if (arguments.length < 4) {
    throw("Required property is missing");
  } else if (
    typeof id !== "number" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof gender !== "string" 
  ) {
    throw("Invalid property type");
  } else if (
    address && typeof address !== "string" ||
    hobbies && typeof hobbies !== "string" 
  ) {
    throw('Invalid additional property type');
  } else if (studentIds.includes(id)) {
    throw(`Student with id ${id} already exists!`);
  } else {
    studentIds.push(id);
    console.log("Student was successfully created");
  }

  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = gender;
  this.address = address;
  this.hobbies = hobbies;
}


/*
var historyCourse = new Course(1, 'history', 'Victoria Cobbett', []); //should output 'Course was successfully created'
var frenchCourse = new Course('3', 'french', 'Josselin Bourseiller', []); //should output 'Invalid property type'
var englishCourse = new Course(2, 'english', 'Andrea Barrett', []); //should output 'Course was successfully created'
var mathematicsCourse = new Course(2, 'mathematics', 'Jack  Connor', []); //should output 'Course with id 2 already exists'
var physicsCourse = new Course(10); //should output 'Required property is missing'

var martinStudent = new Student(1, 'Martin', 'Lawrence', 'M'); //should output 'Student was successfully created'
var kellyStudent = new Student ('3', 'Freddy', 'Kelly', 'M', '3497 James Avenue') //should output 'Invalid required property type'
var kellyStudent = new Student (2, 'Freddy', 'Kelly', 'M', '3497 James Avenue') //should output 'Student was successfully created'
var maxStudent = new Student(2, 'Max', 'Austin', 'M', '4026  Lee Avenue', 'sports') //should output 'Student with id 2 already exists'
var maxStudent = new Student(3, 'Max', 'Austin', 'M', '4026  Lee Avenue', 'sports') //should output 'Student was successfully created'
var aliyaCollins = new Student(4, 'Aliya', 'Collins', 'F', '353  Oliverio Drive', 19) //should output 'Invalid additional property type'
var aliyaCollins = new Student(4, 'Aliya', 'Collins', 'F', '353  Oliverio Drive', 'cooking, reading') //should output 'Student was successfully created'
var norahCollins = new Student(5, 'Norah') //should output 'Required property is missing'

console.log(martinStudent.hobbies) //should output null

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
*/