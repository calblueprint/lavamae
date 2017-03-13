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
  belongs_to :user, :class_name => "User"
  has_and_belongs_to_many :favorited_users, :class_name => "User"
  has_many :upvotes, as: :upvotable, :dependent => :destroy
  acts_as_taggable

  def self.search(search)
    if search
      where('title LIKE ? or content LIKE ?', "%#{search}%", "%#{search}%")
    else
      self.all
    end
  end

  def self.filter(tags)
    discussions = self.all
    tags.each do |t|
      discussions = discussions.tagged_with(t)
    end
    return discussions
  end
  
end
