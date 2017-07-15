class CreateSteps < ActiveRecord::Migration[5.0]
  def change
    create_table :steps do |t|
      t.string :title
      t.string :body
      t.integer :todo_id
      t.boolean :done

      t.timestamps
    end
  end
end
