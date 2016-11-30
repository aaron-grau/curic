# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

artists = Artist.create([{ name: 'Beyonce' }, { name: 'Nicki Minaj' }, { name: 'Ciara' }])

beyonce_albums = Album.create([
    { title: 'Lemonade', artist_id: artists.first.id },
    { title: 'I Am... Sasha Fierce', artist_id: artists.first.id }
  ])
nicki_albums = Album.create([
    { title: 'The Pinkprint', artist_id: artists.second.id },
    { title: 'Pink Friday', artist_id: artists.second.id }
  ])
ciara_albums = Album.create([
    { title: 'Goodies', artist_id: artists.third.id },
    { title: 'Ciara', artist_id: artists.third.id }
  ])

beyonce_tracks = Track.create([
  { title: 'Sorry', album_id: beyonce_albums.first.id },
  { title: 'Pray You Catch Me', album_id: beyonce_albums.first.id },
  { title: 'Halo', album_id: beyonce_albums.second.id },
  { title: 'Video Phone', album_id: beyonce_albums.second.id },
  ])
nicki_tracks = Track.create([
  { title: 'Only', album_id: nicki_albums.first.id },
  { title: 'Feeling Myself', album_id: nicki_albums.first.id },
  { title: 'Fly', album_id: nicki_albums.second.id },
  { title: 'Here I Am', album_id: nicki_albums.second.id },
  ])
ciara_tracks = Track.create([
  { title: '1, 2 Step', album_id: ciara_albums.first.id },
  { title: 'Hotline', album_id: ciara_albums.first.id },
  { title: 'I\m Out', album_id: ciara_albums.second.id },
  { title: 'Read My Lips', album_id: ciara_albums.second.id },
  ])
