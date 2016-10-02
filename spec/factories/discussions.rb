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
