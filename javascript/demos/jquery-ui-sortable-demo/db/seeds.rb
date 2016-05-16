# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
ActiveRecord::Base.transaction do
  list_info = {  "alphabet"=> ["A todo item", "B todo item", "C todo item"],
                 "numbers"=> ["1 todo item", "2 todo item", "3 todo item"],
                 "foods"=> ["chocolate", "gum", "coffee"] }
  list_info.each do |list_title, todo_bodies|
    list = List.create!(title: list_title)
    todo_bodies.each_with_index do |todo_body, ind|
      list.todos.create!(body: todo_body, todo_order: (ind + 1).to_f)
    end
  end
end
