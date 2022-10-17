class UsersController < ApplicationController
  def show
    user = User.find_by( id: session[ :id ] )
    if user
      render json: user
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end
end
