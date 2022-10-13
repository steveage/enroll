class CourseSerializer < ActiveModel::Serializer
  attributes :id, :code, :name, :section, :teacher, :semester

  belongs_to :semester
  belongs_to :teacher
  has_many :students
end
