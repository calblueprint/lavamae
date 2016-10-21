class AddUserIdToDiscussions < ActiveRecord::Migration
  def change
    add_column :discussions, :user_id, :integer
  end
end
