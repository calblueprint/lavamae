class DeleteUserFromDiscussions < ActiveRecord::Migration
  def change
    remove_column :discussions, :user_id
  end
end
