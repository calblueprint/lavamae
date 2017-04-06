class CreateAdminTags < ActiveRecord::Migration
  def change
    create_table :admin_tags do |t|
      t.timestamps null: false
      t.string :name
    end
  end
end
