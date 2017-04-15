# == Schema Information
#
# Table name: admin_tags
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string
#

class AdminTag < ActiveRecord::Base
	validates :name, uniqueness: true
end
