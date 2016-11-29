class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :place
      t.decimal :lat, {:precision => 10, :scale => 6}
      t.decimal :lng, {:precision => 10, :scale => 6}

      t.timestamps null: false
    end
  end
end
