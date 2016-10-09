class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password
      t.string :organization
      t.string :location
      t.integer :num_actions
      t.boolean :is_admin
      t.boolean :on_map

      t.timestamps null: false
    end
  end
end
