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

require 'rails_helper'

RSpec.describe Discussion, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
