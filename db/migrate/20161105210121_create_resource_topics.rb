class CreateResourceTopics < ActiveRecord::Migration
  def change
    create_table :resource_topics do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
