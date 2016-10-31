class Discussion < ActiveRecord::Base
  has_many :responses, :dependent => :destroy
  belongs_to :user

  def self.search(search)
    if search
      where('title LIKE ? or content LIKE ?', "%#{search}%", "%#{search}%")
    else
      self.all
    end
  end
end