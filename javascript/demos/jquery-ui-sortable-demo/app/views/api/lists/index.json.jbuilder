json.array!(@lists) do |list|
  json.partial!("api/lists/list", :list => list, :todos => list.todos)
end
