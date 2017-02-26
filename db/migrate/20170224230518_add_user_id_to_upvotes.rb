class AddUserIdToUpvotes < ActiveRecord::Migration
  def change
    add_column :upvotes, :user_id, :integer, index: true
  end
end
