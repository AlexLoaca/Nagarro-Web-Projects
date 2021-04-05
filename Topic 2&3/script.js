const coursesIds = [];
const studentIds = [];

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

Course.prototype.addStudent = function(theStudent) {
  if (typeof(theStudent) !== 'object') {
    throw("Invalid property type");
  }
  if(this.studentList.length) { // check if the array is empty.
    for(const student of this.studentList) { 
      if (student.id === theStudent.id) {
        throw("This student is already enrolled at this course");
      }
    }
  }
 
  theStudent[this.name + 'Grade'] = null;
  theStudent.courses.push(this.name);
  this.studentList.push(theStudent);
  console.log(`Student with id ${theStudent.id} was successfully added to ${this.name} course`);
}

Course.prototype.deleteStudent = function(studentId) {
  const student = this.studentList.find(el => el.id === studentId);
  if (student) {
    delete student[this.name + 'Grade'];
    this.studentList = this.studentList.filter(el => el.id !== studentId);
    console.log(`Student with id ${studentId} was successfully deleted from this ${this.name} course`);
    this.averageGrade();
  } else {
    console.error('Student id is invalid resulting in failing to delete the specified student from this course');
  }
}

Course.prototype.setGrade = function(student, grade) {
  if (arguments.length < 2) {
   throw ("One of the required properties is missing");
  }
  if (this.studentList.find(el => el === student) && grade >= 1 && grade <= 10){
    student[this.name + 'Grade'] = grade;
    console.log(`The student's grade in the ${this.name} course is ${student[this.name + 'Grade']}`);
    this.averageGrade();
  } else {
    throw ("Student and/or grade are invalid!");
  }
}

Course.prototype.averageGrade = function(showLogs = true) {
  const evaluatedStudents = this.studentList.filter(student => !!student[this.name + "Grade"]);
  if (showLogs) console.log(`For ${this.name} course, we have ${evaluatedStudents.length} students:`);
  const sum = evaluatedStudents.reduce((accumulator, currentValue) => {
    if (showLogs) console.log(`${currentValue.firstName} with ${this.name + 'Grade'} = ${currentValue[this.name + 'Grade']}`);
    return accumulator + currentValue[this.name + "Grade"];
  }, 0);
  const average = sum / evaluatedStudents.length;
  if (showLogs) console.log(`The average grade obtained for ${this.name} course will be ${average}`);
  return average;
}

Course.prototype.printStudentList = function() {
  console.log(this.studentList);
}

Course.prototype.sortStudentsByGrade = function() {
  this.studentList = this.studentList.sort((a, b) => (a[this.name + "Grade"] < b[this.name + "Grade"]) ? 1 : -1);
  return this.studentList;
}

const getStudentsAboveAverage = function(Course) {
  if (!!Course) {
    const aboveAverageStudents = Course.studentList.filter(student => student[Course.name + "Grade"] > Course.averageGrade(false));
    return aboveAverageStudents;
  } else {
    throw ('Please provide an existing course!');
  }
}

const getFavouriteCourse = function(arrayOfStudents) {
    let allCourses = [];
    arrayOfStudents.forEach(student => {
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
    console.log('all: ', allCourses);
    console.log('fav: ', favouriteCourse);
}

const getAllStudentsByCourses = function(arrayOfCourses) {
    let allStudents = [];
    arrayOfCourses.forEach(course => {
        allStudents.push(course.studentList);
    });

    return intersection(allStudents);
}


function intersection() {
  var result = [];
  var lists;

  if (arguments.length === 1) {
    lists = arguments[0];
  } else {
    lists = arguments;
  }

  for (var i = 0; i < lists.length; i++) {
    var currentList = lists[i];
    for (var y = 0; y < currentList.length; y++) {
      var currentValue = currentList[y];
      if (result.indexOf(currentValue) === -1) {
        if (
          lists.filter(function (obj) {
            return obj.indexOf(currentValue) == -1;
          }).length == 0
        ) {
          result.push(currentValue);
        }
      }
    }
  }
  return result;
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
  this.courses = [];
}

Student.prototype.enroll = function(...courses) {
  for (const course of courses) {
    course.addStudent(this); 
  }
}

Student.prototype.dropCourse = function(course) {
  course.deleteStudent(this.id);
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