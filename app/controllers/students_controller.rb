class StudentsController < ApplicationController
    def index
        students = User.where(role: 'student')
        render json: students
    end

    def create
        student = User.create( first_name: params[ :first_name ], last_name: params[ :last_name ], email: params[ :email ], role: 'student', password: params[ :password ], password_confirmation: params[ :password_confirmation ] );
        render json: student, status: :created
    end
end
