# == Schema Information
#
# Table name: resources
#
#  id          :integer          not null, primary key
#  title       :string
#  user_id     :integer
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  attachment  :string
#

class Resource < ActiveRecord::Base
	mount_uploader :attachment, AttachmentUploader
  belongs_to :user
  belongs_to :resource_topic
end
