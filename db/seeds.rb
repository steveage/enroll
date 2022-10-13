# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "🌱 Seeding school..."
semester1 = Semester.create( year: 2022, period: 'spring' )
semester2 = Semester.create( year: 2022, period: 'fall' )

teacher1 = User.create( first_name: 'Teacher_1_First', last_name: 'Teacher_1_Last', email: 'teacher1@gmail.com', role: 'teacher', password: 'asdf', password_confirmation: 'asdf' )
teacher2 = User.create( first_name: 'Teacher 2 first', last_name: 'Teacher 2 last', email: 'teacher2@mail.com', role: 'teacher', password: 'asdf', password_confirmation: 'asdf' )

student1 = User.create( first_name: 'Student1_first', last_name: 'Student1_last', email: 'student1@gmail.com', role: 'student', password: 'asdf', password_confirmation: 'asdf' )
student2 = User.create( first_name: 'Student 2 first', last_name: 'Student 2 last', email: 'student2@mail.com', role: 'student', password: 'asdf', password_confirmation: 'asdf' )

course1 = Course.create( code: 'CS101', name: 'Intro to programming.', section: "1", teacher: teacher1, semester: semester1 )
course2 = Course.create( code: 'CS101', name: 'Intro to programming.', section: "2", teacher: teacher2, semester: semester1 )
course3 = Course.create( code: 'MA201', name: 'Algebra Level 1', section: "1", teacher: teacher1, semester: semester1 )
course4 = Course.create( code: 'PHYS104', name: 'Thermodynamics', section: "1", teacher: teacher2, semester: semester1 )
course5 = Course.create( code: 'COM102', name: 'Fundamentals of Communication', section: "1", teacher: teacher1, semester: semester2 )

enrollment1 = Enrollment.create( user: student1, course: course1, score: 'A' )
enrollment2 = Enrollment.create( user: student1, course: course3, score: "B" )
enrollment3 = Enrollment.create( user: student1, course: course5 )
enrollment4 = Enrollment.create( user: student2, course: course2, score: "A" )
enrollment5 = Enrollment.create( user: student2, course: course3, score: "A" )
enrollment6 = Enrollment.create( user: student2, course: course4, score: "C" )
enrollment7 = Enrollment.create( user: student2, course: course5 )
puts "✅ Done seeding!"