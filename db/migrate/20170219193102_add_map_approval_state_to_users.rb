class AddMapApprovalStateToUsers < ActiveRecord::Migration
  def change
    add_column :users, :map_approval_state, :integer, :default => 0
  end
end
