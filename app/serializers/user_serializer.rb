class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :role, :first_name, :last_name
  has_many :courses, serializer: TeacherCourseSerializer
  has_many :student_courses
end
