# == Schema Information
#
# Table name: responses
#
#  id            :integer          not null, primary key
#  content       :text
#  score         :integer
#  discussion_id :integer
#  is_admin      :boolean
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :integer
#

class Response < ActiveRecord::Base
	belongs_to :user
	belongs_to :discussion
	validates :content, presence: true
  has_many :upvotes, as: :upvotable, dependent: :destroy

  # accepts_nested_attributes_for :upvotes, as: :upvotable
end
