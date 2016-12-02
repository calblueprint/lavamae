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
  has_many :resources

end
