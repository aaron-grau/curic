class Gardener < ActiveRecord::Base
  belongs_to(
    :house,
    class_name: "House",
    foreign_key: :house_id,
    primary_key: :id
  )

  has_many(
    :plants,
    class_name: "Gardener",
    foreign_key: :gardener_id,
    primary_key: :id
  )
end
