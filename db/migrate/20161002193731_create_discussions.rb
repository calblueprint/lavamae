class CreateDiscussions < ActiveRecord::Migration
  def change
    create_table :discussions do |t|
      t.integer :score
      t.text :content
      t.string :tag
      t.boolean :is_resolved
      t.string :title
      t.boolean :is_admin

      t.timestamps null: false
    end
  end
end
