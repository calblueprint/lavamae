class AdminTag < ActiveRecord::Base
	validates :name, uniqueness: true
end
