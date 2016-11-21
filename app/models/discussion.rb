class Discussion < ActiveRecord::Base
  has_many :responses, :dependent => :destroy
  belongs_to :user, :class_name => "User"
  has_and_belongs_to_many :favorited_users, :class_name => "User"

  def self.search(search)
    if search
      where('title LIKE ? or content LIKE ?', "%#{search}%", "%#{search}%")
    else
      self.all
    end
  end
end