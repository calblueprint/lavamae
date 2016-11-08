class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates :first_name, :last_name, :password_confirmation, presence: true
  has_many :discussions
  has_and_belongs_to_many :favorite_discussions, :class_name => "Discussion", :foreign_key => "favorite_discussion_id"
  has_many :responses

  def full_name
  	return first_name + " " + last_name
  end
end
