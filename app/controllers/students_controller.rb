class StudentsController < PreliminaryController
    def index
        students = User.where(role: 'student')
        render json: students
    end

    def create
        student = User.create!( first_name: params[ :first_name ], last_name: params[ :last_name ], email: params[ :email ], role: 'student', password: params[ :password ], password_confirmation: params[ :password_confirmation ] );
        render json: student, status: :created
    end

    private
    def authorize
         return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session.include? :user_id and session[ :role ] == "student"
    end
end
