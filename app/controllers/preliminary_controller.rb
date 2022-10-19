class PreliminaryController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: [ :index ]
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_record

    private
    def authorize
         return render json: { errors: ["Not authorized"] }, status: :unauthorized unless session.include? :user_id
    end

    def render_invalid_record( exception )
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
end
