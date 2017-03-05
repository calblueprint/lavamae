class Image < ActiveRecord::Base
  mount_base64_uploader :profile_pic, AvatarUploader
  belongs_to :user
end
