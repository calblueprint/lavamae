class UsersController < ApplicationController
  before_action :authenticate_user!, :except => [:show]

  def show
    @user = User.find(params[:id])
    @location = nil
    if @user.location_id
      @location = Location.find(@user.location_id)
    end
    @favorite_discussions = @user.favorite_discussions
    if @user.is_admin
      @pending_map_users = User.where(map_approval_state: 0, on_map: true)
      @current_admins = User.where(is_admin: true)
      @non_admin_users = User.where(is_admin: false)
    else
      @pending_map_users = []
      @current_admins = []
      @non_admin_users = []
    end
  end

  # batch update user's map_approval_state based on admin decision
  def map_approval_update
    puts(params)
    puts(map_approval_params)
    @admin = User.find(params[:admin_id])
    @user = User.find(params[:user_id])
    if @admin.is_admin
      if @user.update(map_approval_params)
        render_json_message(:ok)
      else
        render_json_message(:forbidden, message: "User not updated.")
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
    params.permit(:id, :first_name, :last_name, :email, :organization, :location_id,
                      :website, :on_map, :profile_pic);
  end

  def map_approval_params
    params.permit(:map_approval_state);
  end
end
