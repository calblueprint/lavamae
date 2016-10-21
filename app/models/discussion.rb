class Discussion < ActiveRecord::Base
	has_many :responses, :dependent => :destroy
  belongs_to :user
end