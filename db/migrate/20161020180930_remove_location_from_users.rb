class RemoveLocationFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :location, :string
  end
end
