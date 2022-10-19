class Semester < ApplicationRecord
    has_many :courses

    validates :year, presence: true
    validates :period, presence: true
end