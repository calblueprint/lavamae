class CreateFavoriteDiscussionsUsersJoinTable < ActiveRecord::Migration
  def change
    create_table :discussions_users, id: false do |t|
      t.integer :favorite_discussion_id, index: true
      t.integer :favorited_user_id, index: true
    end
  end
end
