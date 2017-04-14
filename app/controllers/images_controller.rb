class ImagesController < ApplicationController
  before_filter :convert_photo, only: [:create, :update]

  def create
    user = User.find(params[:user_id])
    image = user.images.new(image_params)
    image.user_id = current_user.id
    if image.save
      render_json_message(:ok, message: "Image successfully added!")
    else
      render_json_message(:forbidden, errors: user.errors.full_messages)
    end
  end

  def update
    image = Image.find(params[:id])
    if image.update(image_params)
      render_json_message(:ok, message: "Image successfully updated!")
    else
      render_json_message(:forbidden, errors: user.errors.full_messages)
    end
  end

  def convert_photo
    return if params[:user].blank?
    params[:user][:photo] = FileUploadUtils.convert_base64(params[:user][:photo])
  end

  def destroy
    photos = delete_params[:photo_ids]
    if current_user.id == Image.find(photos[0]).user_id
      if Image.where(id: photos).destroy_all
        render_json_message(:ok, message: "Photos successfully deleted!")
      else
        render_json_message(:forbidden, errors: "Please select a valid photo.")
      end
    else
      render_json_message(:forbidden, errors: "You can only delete your own photos.")
    end
  end

  private

  def image_params
    params.require(:user).permit(:user_id, :id, :photo, :title, :description)
  end

  def delete_params
    params.require(:user)
  end
end
