class Enrollment < ApplicationRecord
    belongs_to :course
    belongs_to :user

    validates :user, presence: true
    validates :course, presence: true
end