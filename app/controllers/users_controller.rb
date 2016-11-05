class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = User.find(params[:id])
  end

  def update
    user = User.find(params[:id])
    if user.update(update_params)
      render_json_message(:ok, message: "Account info successfully updated!")
    else
      render_json_message(:forbidden, errors: user.errors.full_messages)
    end
  end

  private

  def update_params
    params.permit(:id, :first_name, :last_name, :email, :organization, :city, :country, :on_map);
  end
end
