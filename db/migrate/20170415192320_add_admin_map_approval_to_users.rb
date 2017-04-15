class AddAdminMapApprovalToUsers < ActiveRecord::Migration
  def change
    add_column :users, :admin_map_approval, :boolean, :default => true
  end
end
