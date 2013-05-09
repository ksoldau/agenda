class CreateSubjects < ActiveRecord::Migration
  def change
    create_table :subjects do |t|
      t.string :name, :null => false

      t.integer :assignment_id, :null => false

      t.timestamps
    end
  end
end
