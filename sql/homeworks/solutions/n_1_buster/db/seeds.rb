# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

artists = Artist.create([
  { name: 'Beyonce' },
  { name: 'Nicki Minaj' },
  { name: 'Ciara' }
])

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
  { title: 'Video Phone', album_id: beyonce_albums.second.id }
  ])
nicki_tracks = Track.create([
  { title: 'Only', album_id: nicki_albums.first.id },
  { title: 'Feeling Myself', album_id: nicki_albums.first.id },
  { title: 'Fly', album_id: nicki_albums.second.id },
  { title: 'Here I Am', album_id: nicki_albums.second.id }
  ])
ciara_tracks = Track.create([
  { title: '1, 2 Step', album_id: ciara_albums.first.id },
  { title: 'Hotline', album_id: ciara_albums.first.id },
  { title: 'I\m Out', album_id: ciara_albums.second.id },
  { title: 'Read My Lips', album_id: ciara_albums.second.id }
  ])





houses = House.create([
    { address: "10th and Madison" },
    { address: "Hopkins House" },
    { address: "2990 Mission St" },
    { address: "1458 11th Ave" }
  ])

gardeners = Gardener.create([
    { name: 'Molly', house_id: houses.first.id },
    { name: 'Scott', house_id: houses.second.id },
    { name: 'Noemi', house_id: houses.second.id },
    { name: 'Arthur', house_id: houses.third.id },
    { name: 'Fred', house_id: houses.fourth.id },
    { name: 'Sandy', house_id: houses.fourth.id }
  ])

plants = Plant.create([
    { species: 'Maple Ash', gardener_id: gardeners[0].id},
    { species: 'Sweet Woodruff', gardener_id: gardeners[0].id},
    { species: 'Huckleberry', gardener_id: gardeners[1].id},
    { species: 'Flowering Dogwood', gardener_id: gardeners[1].id},
    { species: 'Penny Hedge', gardener_id: gardeners[2].id},
    { species: 'Sunflower', gardener_id: gardeners[2].id},
    { species: 'Yellow Fieldcress', gardener_id: gardeners[3].id},
    { species: 'Brown-eyed Susan', gardener_id: gardeners[3].id},
    { species: 'Collard', gardener_id: gardeners[4].id},
    { species: 'Fennel', gardener_id: gardeners[4].id},
    { species: 'Rosemary', gardener_id: gardeners[5].id},
    { species: 'Green Cottonwood', gardener_id: gardeners[5].id}
  ])

seeds = Seed.create([
    { count: 10, plant_id: plants[0].id },
    { count: 7, plant_id: plants[1].id },
    { count: 22, plant_id: plants[2].id },
    { count: 13, plant_id: plants[3].id },
    { count: 5, plant_id: plants[4].id },
    { count: 41, plant_id: plants[5].id },
    { count: 27, plant_id: plants[6].id },
    { count: 3, plant_id: plants[7].id },
    { count: 14, plant_id: plants[8].id },
    { count: 35, plant_id: plants[9].id },
    { count: 17, plant_id: plants[10].id },
    { count: 8, plant_id: plants[11].id }
  ])



routes = Route.create([
    { number: 48 },
    { number: 24 },
    { number: 49 },
    { number: 28 },
    { number: 10 }
  ])

buses = Bus.create([
    { model: 'VW', route_id: routes.first.id },
    { model: 'MiniTour', route_id: routes.second.id },
    { model: 'Aero Town', route_id: routes.second.id },
    { model: 'Paragon', route_id: routes.third.id },
    { model: 'Spectra', route_id: routes.fourth.id },
    { model: 'Versa', route_id: routes.fourth.id },
    { model: 'Globus', route_id: routes.fifth.id }
  ])

drivers = Driver.create([
    { name: 'Joan Lee', bus_id: buses[0].id },
    { name: 'Charlie McDonald', bus_id: buses[0].id },
    { name: 'Kevin Quashie', bus_id: buses[0].id },
    { name: 'Ed Michaels', bus_id: buses[1].id },
    { name: 'Lisa Frank', bus_id: buses[1].id },
    { name: 'Sharla Alegria', bus_id: buses[1].id },
    { name: 'Roger Sanders', bus_id: buses[2].id },
    { name: 'Tom Cathy', bus_id: buses[2].id },
    { name: 'Harold Martin', bus_id: buses[3].id },
    { name: 'Willow Smith', bus_id: buses[3].id },
    { name: 'Dulce Rivera', bus_id: buses[4].id },
    { name: 'Michael Li', bus_id: buses[4].id },
    { name: 'Megan West', bus_id: buses[5].id },
    { name: 'Katherine Key', bus_id: buses[5].id },
    { name: 'Jett Taylor', bus_id: buses[6].id },
    { name: 'Shaleece Haas', bus_id: buses[6].id }
  ])
