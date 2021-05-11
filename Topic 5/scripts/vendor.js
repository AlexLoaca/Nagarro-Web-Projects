const studentIds = [];

function Course(name, assignedTeacher) {
  if (name == "" || name == null ||
      assignedTeacher == "" || assignedTeacher == null 
  ) throw "Required property is missing";
  if (typeof name !== "string" || typeof assignedTeacher !== "string")
    throw "Invalid property type";

  console.log("Course was successfully created");

  this.name = name;
  this.assignedTeacher = assignedTeacher;
  this.studentList = [];
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

Course.prototype.deleteStudent = function (student) {
  if (student) {
    delete student[this.name + "Grade"];
    this.studentList = this.studentList.filter((el) => el.id !== student.id);
    console.log(
      `Student with id ${student.id} was successfully deleted from this ${this.name} course`
    );

    student.courses.splice(student.courses.indexOf(this.name), 1); // Removes from student courses array.

    this.averageGrade();
    return [this, student];
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

function Student(firstName, lastName, gender, address = null, hobbies = null) {
  if (
    firstName == "" ||
    firstName === null ||
    lastName == "" ||
    lastName === null ||
    gender == "" ||
    gender === null
  )
    throw "Required property is missing";
  if (
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

  console.log("Student was successfully created");

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

export { studentIds, Course, Student };
