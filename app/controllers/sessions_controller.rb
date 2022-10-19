class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    
    if user&.authenticate(params[:password])
      session[ :user_id ] = user.id;
      session[ :role ] = user.role;
      render json: user, status: :ok
    else
      render json: { errors: ["Check your credentials and try again."] }, status: :unauthorized
    end

  end

  def destroy
    session.delete :user_id
    session.delete :role
    head :no_content
  end
end
