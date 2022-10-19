class Course < ApplicationRecord
    belongs_to :semester
    belongs_to :teacher, class_name: 'User'
    has_many :enrollments
    has_many :students, through: :enrollments, source: :user

    validates :code, presence: true
    validates :name, presence: true
    validates :section, presence: true
    validates :semester, presence: true
    validates :teacher, presence: true
end