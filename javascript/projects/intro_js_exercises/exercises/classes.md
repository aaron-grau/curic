# Students and Courses

Here's our [reading][oo-js] Object-Oriented Programming in JS. Use it for reference as you work on this exercise!

Write a set of classes to model `Student`s and `Course`s.

### Phase 1:
* `Student.prototype.initialize` should take a first and last name.
* `Student.prototype.name` should return the concatenation of the student's
  first and last name.
* `Student.prototype.courses` should return a list of the `Course`s in which
  the student is enrolled.
* `Student.prototype.enroll` should take a `Course` object, add it to the
  student's list of courses, and update the `Course`'s list of
  enrolled students.
    * `enroll` should ignore attempts to re-enroll a student.
* `Student.prototype.courseLoad` should return a hash of departments to # of
  credits the student is taking in that department.
* `Course.prototype.initialize` should take the course name, department, and
  number of credits.
* `Course.prototype.students` should return a list of the enrolled students.
* `Course.prototype.addStudent` should add a student to the class.
  * Probably can rely upon `Student.prototype.enroll`.

### Phase 2:
* Each course should also take a set of days of the week (`:mon`,
  `:tue`, ...), plus a time block (assume each day is broken into 8
  consecutive time blocks). So a course could meet
  `[:mon, :wed, :fri]` during block #1.
    * Update your `initialize` method to also take a time block and
      days of the week.
* Write a method `Course.prototype.conflictsWith` which takes a second
  `Course` and returns true if they conflict.
* Update `Student.prototype.enroll` so that you raise an error if a `Student`
  enrolls in a new course that conflicts with an existing course time.
    * May want to write a `Student.prototype.hasConflict` method to help.

[oo-js]: ../../../readings/object-oriented-js.md
