# == Schema Information
#
# Table name: responses
#
#  id            :integer          not null, primary key
#  content       :text
#  score         :integer
#  discussion_id :integer
#  is_admin      :boolean
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :integer
#

FactoryGirl.define do
  factory :response do
    content "MyText"
    score 1
    discussion_id 1
  end
end
