class UsersController < ApplicationController
  before_action :authenticate_user!, :except => [:show]
  before_filter :convert_photo, only: [:photo_update]

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

  def photo_update
    user = User.find(params[:user_id])
    if user.update(photo_update_params)
      render_json_message(:ok, message: "Gallery successfully updated!")
    else
      render_json_message(:forbidden, errors: user.errors.full_messages)
    end
  end

  # def photo_destroy
  #   user = User.find(params[:user_id])

  # end

  def convert_photo
    return if params[:user].blank? ||
        params[:user][:images_attributes].blank?
    images = params[:user][:images_attributes].map do |k, photo_object|

      photo_file = FileUploadUtils.convert_base64(
          photo_object[:photo_data])
      return unless photo_file

      photo_object[:photo] = photo_file
      photo_object.delete(:photo_data)
      photo_object
    end
    params[:user][:images_attributes] = images.compact
  end

  private

  def update_params
    params.permit(:id, :first_name, :last_name, :email, :organization, :location_id, :website, :on_map, :profile_pic, :bio)
  end

  def photo_update_params
    params.require(:user).permit(:id, images_attributes: [:id, :photo])
  end

  def map_approval_params
    params.permit(:map_approval_state)
  end
end
