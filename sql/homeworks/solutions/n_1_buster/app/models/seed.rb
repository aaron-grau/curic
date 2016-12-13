class Seed < ActiveRecord::Base
  belongs_to(
    :plant,
    class_name: "Plant",
    foreign_key: :plant_id,
    primary_key: :id
  )
end
