class CreateCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :courses do |t|
      t.string :code
      t.string :name
      t.string :section
      t.integer :teacher_id
      t.integer :semester_id

      t.timestamps
    end
  end
end
