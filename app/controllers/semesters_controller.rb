class SemestersController < PreliminaryController
    def index
        semesters = Semester.all
        render json: semesters
    end

    def create
        semester = Semester.create!( year: params[ :year ], period: params[ :period ] )
        render json: semester, status: :created
    end
end