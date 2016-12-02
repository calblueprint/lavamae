class AddLocationIdToUser < ActiveRecord::Migration
  def change
    add_reference :users, :location, index: true, foreign_key: true
  end
end
