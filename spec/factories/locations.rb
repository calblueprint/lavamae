# == Schema Information
#
# Table name: locations
#
#  id         :integer          not null, primary key
#  place      :string
#  lat        :decimal(10, 6)
#  lng        :decimal(10, 6)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do
  factory :location do
    place "MyString"
    lat "9.99"
    lng "9.99"
  end
end
