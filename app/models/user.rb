# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  first_name             :string
#  last_name              :string
#  organization           :string
#  num_actions            :integer
#  is_admin               :boolean
#  on_map                 :boolean
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  email                  :string           default(""), not null
#  profile_pic            :string
#  location_id            :integer
#  map_approval_state     :integer          default(0)
#  website                :string
#  bio                    :text
#

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates :first_name, :last_name, presence: true
  mount_base64_uploader :profile_pic, AvatarUploader
  has_many :discussions
  has_and_belongs_to_many :favorite_discussions, :class_name => "Discussion"
  has_many :responses
  belongs_to :location
  enum map_approval_state: { pending: 0, approved: 1, rejected: 2}
  has_many :upvotable, :dependent => :destroy
  has_many :images, :dependent => :destroy
  accepts_nested_attributes_for :images

  def full_name
  	return first_name + " " + last_name
  end
end
