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

require 'rails_helper'

RSpec.describe Upvote, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
