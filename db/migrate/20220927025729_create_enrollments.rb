class CreateEnrollments < ActiveRecord::Migration[6.1]
  def change
    create_table :enrollments do |t|
      t.integer :user_id
      t.integer :course_id
      t.string :score

      t.timestamps
    end
  end
end
