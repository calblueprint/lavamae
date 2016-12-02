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

FactoryGirl.define do
  factory :discussion do
    score 1
    content "MyText"
    tag "MyString"
    is_resolved false
    title "MyString"
    is_admin false
  end
end
