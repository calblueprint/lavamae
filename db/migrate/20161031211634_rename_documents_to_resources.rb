class RenameDocumentsToResources < ActiveRecord::Migration
  def self.up
    rename_table :documents, :resources
  end

  def self.down
    rename_table :resources, :documents
  end
end
