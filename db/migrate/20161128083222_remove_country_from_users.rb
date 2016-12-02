class RemoveCountryFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :country
  end
end
