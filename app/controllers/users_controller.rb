class UsersController < ApplicationController
  before_action :authenticate_user!, :except => [:show]

  def show
    @user = User.find(params[:id])
    @location = nil
    if @user.location_id
      @location = Location.find(@user.location_id)
    end
    @favorite_discussions = @user.favorite_discussions
    @volunteers = User.where("volunteer = ? OR seeking_volunteer = ?", true, true).where(location_id: @location).where.not(id: @user.id)
    if @user.is_admin
      @pending_map_users = User.where(map_approval_state: 0, on_map: true)
    else
      @pending_map_users = []
    end
  end

  def destroy
    if current_user.is_admin
      @user = User.find(params[:id])
      @user.destroy
      redirect_to admin_dashboard_path( status: 303 )
    end
  end

  # batch update user's map_approval_state based on admin decision
  def map_approval_update
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

  def admin_approval_update
    @admin = User.find_by(id: params[:admin_id])
    @user = User.find_by(id: params[:user_id])
    if @admin.is_admin
      if @user.update(admin_approval_params)
        @user.pending_admin = false
        @user.is_admin = params[:admin_approval_state].to_i % 2 == 1
        if @user.save
          render_json_message(:ok)
        end
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
    params.permit(:id, :first_name, :last_name, :email, :secondary_name, :secondary_email, :tertiary_name, :tertiary_email,
                      :organization, :location_id, :website, :on_map, :volunteer, :seeking_volunteer, :bio)
  end

  def map_approval_params
    params.permit(:map_approval_state)
  end

  def admin_approval_params
    params.permit(:admin_approval_state)
  end
end
