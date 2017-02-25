class CreateUpvoteDiscussionUserJoinTable < ActiveRecord::Migration
  def change
    create_table :discussions_users_upvote, id: false do |t|
      t.integer :upvote_discussion, index: true
      t.integer :upvote_user, index: true
    end
  end
end
