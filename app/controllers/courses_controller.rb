class CoursesController < ApplicationController
    def index
        courses = Course.all
        render json: courses
    end

    def create
        course = Course.create( code: params[ :code ], name: params[ :name ], section: params[ :section ], semester_id: params[ :semester_id ], teacher_id: params[ :teacher_id ] )
        render json: course, status: :created
    end
end
