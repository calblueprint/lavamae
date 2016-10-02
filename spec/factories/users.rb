FactoryGirl.define do
  factory :user do
    first_name "MyString"
    last_name "MyString"
    email "MyString"
    password "MyString"
    organization "MyString"
    location "MyString"
    num_actions 1
    is_admin false
    on_map false
  end
end
