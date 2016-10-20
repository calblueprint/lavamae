class Discussion < ActiveRecord::Base
	# belongs_to :user
	has_many :responses, :dependent => :destroy
  belongs_to :user
end