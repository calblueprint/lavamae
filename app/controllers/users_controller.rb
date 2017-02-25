class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = User.find(params[:id])
    @location = nil
    if @user.location_id
      @location = Location.find(@user.location_id)
    end
    @favorite_discussions = @user.favorite_discussions
    if @user.is_admin
      @pending_map_users = User.where(map_approval_state: 0, on_map: true)
    else
      @pending_map_users = []
    end
  end

  # batch update user's map_approval_state based on admin decision
  def approval_update
    @user = User.find(params[:admin_id])
    if @user.is_admin
      if User.update(params["modified_users"].keys, params["modified_users"].values)
        render_json_message(:ok, message: "User map decisions saved!")
      else
        render_json_message(:forbidden, message: "User map decisions not updated.")
      end
    end
  end

  def update
    user = User.find(params[:id])
    if user.update(update_params)
      render_json_message(:ok, message: "Account info successfully updated!")
    else
      render_json_message(:forbidden, errors: user.errors.full_messages)
    end
  end

  def edit_user_password_url
    `/passwords/update`
  end

  private

  def update_params
    params.permit(:id, :first_name, :last_name, :email, :organization, :location_id, :website, :on_map);
  end
end
