class CreateUpvoteResponseUserJoinTable < ActiveRecord::Migration
  def change
    create_table :responses_users_upvote, id: false do |t|
      t.integer :upvote_response, index: true
      t.integer :upvote_user, index: true
    end
  end
end
