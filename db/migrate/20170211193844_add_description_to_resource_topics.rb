class AddDescriptionToResourceTopics < ActiveRecord::Migration
  def change
    add_column :resource_topics, :description, :string
  end
end
