class AddUserToResponses < ActiveRecord::Migration
  def change
    add_reference :responses, :user, index: true, foreign_key: true
  end
end
