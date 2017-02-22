# == Schema Information
#
# Table name: resource_topics
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ResourceTopic < ActiveRecord::Base
  mount_uploader :attachment, AttachmentUploader
  mount_base64_uploader :attachment, Attachment64Uploader
  belongs_to :user

end
