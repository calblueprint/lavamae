class AddSecondaryContactInfoToUsers < ActiveRecord::Migration
  def change
    add_column :users, :secondary_name, :string
    add_column :users, :secondary_email, :string
    add_column :users, :tertiary_name, :string
    add_column :users, :tertiary_email, :string
  end
end
