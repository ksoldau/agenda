class CreateAssignments < ActiveRecord::Migration
  def change
    create_table :assignments do |t|

      t.string :description, :null => false
      t.datetime :due_date, :null => false
      t.string :subject, :default => ""
      t.boolean :completed, :default => false

      t.integer :user_id, :null => false
      t.integer :subject_id, :null => false

      t.timestamps
    end
  end
end
