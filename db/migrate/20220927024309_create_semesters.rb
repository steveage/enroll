class CreateSemesters < ActiveRecord::Migration[6.1]
  def change
    create_table :semesters do |t|
      t.integer :year
      t.string :period

      t.timestamps
    end
  end
end
