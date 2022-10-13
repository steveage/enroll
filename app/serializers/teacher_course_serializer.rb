class TeacherCourseSerializer < ActiveModel::Serializer
  attributes :id, :code, :name, :section, :semester
end
