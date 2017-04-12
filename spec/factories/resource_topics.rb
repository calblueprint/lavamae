# == Schema Information
#
# Table name: resource_topics
#
#  id          :integer          not null, primary key
#  name        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :string
#  attachment  :string
#

FactoryGirl.define do
  factory :resource_topic do
    name "MyString"
  end
end
