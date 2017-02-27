# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.create!(username: "robert")
User.create!(username: "bill")
Artwork.create!(title: "nighthawks", image_url: "google.com", artist_id: 1)
Artwork.create!(title: "mona lisa", image_url: "google1.com", artist_id: 1)
Comment.create!(body: "great!", user_id: 1, artwork_id: 1)
Comment.create!(body: "another great one", user_id: 2, artwork_id: 2)
