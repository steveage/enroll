class User < ApplicationRecord
    has_many :courses, foreign_key: 'teacher_id'
    has_many :enrollments
    has_many :student_courses, through: :enrollments, source: :course
    has_secure_password

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true
end
