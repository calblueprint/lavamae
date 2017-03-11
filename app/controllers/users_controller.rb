class UsersController < ApplicationController
  before_action :authenticate_user!, :except => [:show]
  before_filter :convert_photo, only: [:update]

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

  def update
    @user = User.find(params[:user_id])
    if @user.update(update_params)
      render_json_message(:ok, message: "Account info successfully updated!")
    else
      render_json_message(:forbidden, errors: user.errors.full_messages)
    end
  end

  def edit_user_password_url
    `/passwords/update`
  end


  # def image
  #   respond_to do |format|
  #     if @user.update(update_params)
  #       format.html { redirect_to @user.post, notice: 'Post attachment was successfully updated.' }
  #     end
  #   end
  # end

  def convert_photo
    return if params[:user][:images].blank? ||
      params[:user][:images][:photo_data].blank?
    photo_file = FileUploadUtils.convert_base64(
        params[:user][:images][:photo_data])
    return unless photo_file

    params[:user][:images][:photo] = photo_file
    params[:user][:images].delete(:photo_data)
    puts photo_file
    render_json_message(:ok, message: "Photo(s) successfully updated!")
  end

  # def image
  #   @user = User.find(params[:user_id])
  #   @user.images.create(user_id: @user.id)
  #   @user.save
  #   redirect_to users_path(user_id: params[:user_id])
  # end
  private

  def update_params
    params.require(:user).permit(:id, :first_name, :last_name, :email, :organization, :location_id, :website, :on_map, :bio, images:[:photo])
  end

  def map_approval_params
    params.permit(:map_approval_state)
  end
end
