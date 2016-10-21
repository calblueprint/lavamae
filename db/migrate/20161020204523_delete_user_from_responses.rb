class DeleteUserFromResponses < ActiveRecord::Migration
  def change
        remove_column :responses, :user_id
  end
end
