class EnrollmentsController < ApplicationController
    def index
        enrollments = Enrollment.all
        render json: enrollments
    end

    def create
        enrollment = Enrollment.create(  user_id: params[ :user_id ], course_id: params[ :course_id ], score: params[ :score ] )
        render json: enrollment, status: :created
    end

    def destroy
        enrollment = Enrollment.find_by( id: params[ :id ] );
        if enrollment
            enrollment.destroy
            head :no_content
        else
            render json: { errors: [ "Enrollment not found."] }, status: not_found
        end
    end

    def update
        enrollment = Enrollment.find_by( id: params[ :id ] );
        if enrollment
            enrollment.update( score: params[ :score ] );
            render json: enrollment
        else
            render json: { errors: [ "Enrollment not found." ] }, status: :not_found
        end
    end
end