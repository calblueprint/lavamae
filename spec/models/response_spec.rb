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
#  user_name     :string
#  user_image    :string
#

require 'rails_helper'

RSpec.describe Response, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
