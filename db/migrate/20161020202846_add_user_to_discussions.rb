class AddUserToDiscussions < ActiveRecord::Migration
  def change
    add_reference :discussions, :user, index: true, foreign_key: true
  end
end
