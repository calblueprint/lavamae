class AddVolunteerStatusToUsers < ActiveRecord::Migration
  def change
    add_column :users, :volunteer, :boolean, :default => false
    add_column :users, :seeking_volunteer, :boolean, :default => false
  end
end
