# == Schema Information
#
# Table name: images
#
#  id         :integer          not null, primary key
#  photo      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#

class Image < ActiveRecord::Base
  mount_base64_uploader :photo, AvatarUploader
  belongs_to :user
  validates :photo, presence: true
end
