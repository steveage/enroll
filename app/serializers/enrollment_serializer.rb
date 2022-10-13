class EnrollmentSerializer < ActiveModel::Serializer
  attributes :id, :user, :course, :score

  belongs_to :user
  belongs_to :course
end
