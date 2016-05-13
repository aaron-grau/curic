json.(list, :id, :title)

todos ||= nil
unless todos.nil?
  json.todos(todos) do |todo|
    json.partial!("api/todos/todo", :todo => todo)
  end
end
