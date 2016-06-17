json.extract!(
  pokemon,
  :id, :attack, :defense, :image_url, :moves, :name, :poke_type
)

if show_toys
  json.toys do
    json.array!(pokemon.toys) do |toy|
      json.partial! 'api/toys/toy', toy: toy
    end
  end
end
