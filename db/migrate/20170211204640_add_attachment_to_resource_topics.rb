class AddAttachmentToResourceTopics < ActiveRecord::Migration
  def change
    add_column :resource_topics, :attachment, :string
  end
end
