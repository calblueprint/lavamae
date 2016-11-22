class Response < ActiveRecord::Base
	belongs_to :user
	belongs_to :discussion
	validates :content, presence: true
end
