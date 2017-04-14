# == Schema Information
#
# Table name: upvotes
#
#  id             :integer          not null, primary key
#  upvotable_id   :integer
#  upvotable_type :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  user_id        :integer
#

FactoryGirl.define do
  factory :upvote do
    
  end
end
