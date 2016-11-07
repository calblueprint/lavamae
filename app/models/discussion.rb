# == Schema Information
#
# Table name: discussions
#
#  id          :integer          not null, primary key
#  score       :integer
#  content     :text
#  tag         :string
#  is_resolved :boolean
#  title       :string
#  is_admin    :boolean
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :integer
#

class Discussion < ActiveRecord::Base
  has_many :responses, :dependent => :destroy
  belongs_to :user

end
