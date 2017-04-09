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
    delete_params[:photo_ids].map { |i| i.to_i }
    # Image.where(id: delete_params[:photo_ids]).destroy_all
    # render_json_message(:ok, message: "Photos successfully deleted!")
    if Image.where(id: delete_params[:photo_ids]).destroy_all
      render_json_message(:ok, message: "Photos successfully deleted!")
    else
      render_json_message(:forbidden, errors: "Please select a valid photo.")
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
