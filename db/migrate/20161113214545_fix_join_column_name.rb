class FixJoinColumnName < ActiveRecord::Migration
  def change
  	rename_column :discussions_users, :favorite_discussion_id, :discussion_id
  	rename_column :discussions_users, :favorited_user_id, :user_id
  end
end
