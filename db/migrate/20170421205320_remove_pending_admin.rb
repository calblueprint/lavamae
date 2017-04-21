class RemovePendingAdmin < ActiveRecord::Migration
  def change
  	remove_column :users, :pending_admin, :boolean
  end
end
