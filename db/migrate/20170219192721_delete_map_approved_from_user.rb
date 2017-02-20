class DeleteMapApprovedFromUser < ActiveRecord::Migration
  def change
    remove_column :users, :map_approved
  end
end
