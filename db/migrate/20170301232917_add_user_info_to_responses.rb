class AddUserInfoToResponses < ActiveRecord::Migration
  def change
    add_column :responses, :user_name, :string
    add_column :responses, :user_image, :string
  end
end
