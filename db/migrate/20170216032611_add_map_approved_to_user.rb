class AddMapApprovedToUser < ActiveRecord::Migration
  def change
    add_column :users, :map_approved, :boolean, :default => false
  end
end
