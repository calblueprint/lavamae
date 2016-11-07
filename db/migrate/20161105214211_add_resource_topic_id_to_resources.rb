class AddResourceTopicIdToResources < ActiveRecord::Migration
  def change
    add_column :resources, :resource_topic_id, :integer
  end
end
