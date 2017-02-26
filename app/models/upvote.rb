class Upvote < ActiveRecord::Base
  belongs_to :upvotable, polymorphic: true
end
