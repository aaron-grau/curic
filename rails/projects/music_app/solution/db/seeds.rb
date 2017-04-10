# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Band.destroy_all
Album.destroy_all
Track.destroy_all

little_as = Band.create!(name: "the little 'a's")
big_as = Band.create!(name: "THE BIG 'A's")

gonna  = Album.create!(name: "Gonna be a big A someday!", band: little_as, year: 2017)

Track.create!(name: "Why would I make my own bracket method?", album: gonna, ord: 1, lyrics: "lalalalala")
Track.create!(name: "I am riding the rails of majesty", album: gonna, ord: 2, lyrics: "rails rails rrrrails")
