class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates :first_name, :last_name, :password_confirmation, presence: true
  has_many :discussions
  has_many :responses

  def full_name
  	return first_name + " " + last_name
  end
end
