class Student < ApplicationRecord
    has_many :courses
    has_many :enrollments
    has_many :courses, through: :enrollments

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true
    validates :email, format: /@/
    validates :email, :uniqueness => {:case_sensitive => false}
    validates :role, inclusion: %w(student)
    validates :password, presence: true, confirmation: true
end