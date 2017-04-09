class PendingAdmin < ActiveRecord::Migration
  def change
  	add_column :users, :admin_approval_state, :integer, :default => 0
    add_column :users, :pending_admin, :boolean
  end
end
