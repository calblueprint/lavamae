class CreateResponses < ActiveRecord::Migration
  def change
    create_table :responses do |t|
      t.text :content
      t.integer :score
      t.integer :discussion_id
      t.boolean :is_admin

      t.timestamps null: false
    end
  end
end
