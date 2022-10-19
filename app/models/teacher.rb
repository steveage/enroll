class Teacher < ApplicationRecord
    has_many :courses

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :email, presence: true
    validates :email, format: /@/
    validates :email, :uniqueness => {:case_sensitive => false}
    validates :role, inclusion: %w(teacher)
    validates :password, presence: true, confirmation: true
end
