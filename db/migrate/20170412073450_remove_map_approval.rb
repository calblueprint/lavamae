class RemoveMapApproval < ActiveRecord::Migration
  def change
  	remove_column :users, :on_map, :boolean
  	remove_column :users, :map_approval_state, :integer
  end
end
