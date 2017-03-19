class ImagesController < ApplicationController
  before_filter :convert_photo, only: [:update]

  def update
    user = User.find(params[:id])
    if user.update(update_params)
      render_json_message(:ok, message: "Gallery successfully updated!")
    else
      render_json_message(:forbidden, errors: user.errors.full_messages)
    end
  end

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

  def destroy
    Image.destroy_all(params[:delete_params])
    render_json_message(:ok, message: "Photos successfully deleted!")
  end

  private

  def update_params
    params.require(:user).permit(:id, images_attributes: [:id, :photo], )
  end

  def delete_params
    params.permit(:user_id, photo_ids:[])
  end
end
