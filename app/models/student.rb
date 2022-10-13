class Student < ApplicationRecord
    has_many :courses
    has_many :enrollments
    has_many :courses, through: :enrollments
end